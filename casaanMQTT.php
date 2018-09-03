#!/usr/bin/php
<?php

require(realpath(dirname(__FILE__))."/../phpMQTT/phpMQTT.php");

$client_id = uniqid("casaanMQTT_"); // make sure this is unique for connecting to sever - you could use uniqid()
$topicprefix = 'home/casaan/';

$inisettings = parse_ini_file("casaanMQTT.ini",true);

var_dump($inisettings);

$mqttdata = array();

$mqtt = new phpMQTT($inisettings["mqtt"]["server"], $inisettings["mqtt"]["port"], $client_id);

$lastgasdatetime = "";

if(!$mqtt->connect(true, NULL, $inisettings["mqtt"]["username"], $inisettings["mqtt"]["password"])) {
	exit(1);
}

echo "Connected to mqtt server...\n";
$topics = array();
$topics['home/ESP_SMARTMETER/electricity/kwh_provided1'] = array("qos" => 0, "function" => "smartmetermessage");
$topics['home/ESP_SMARTMETER/electricity/kwh_provided2'] = array("qos" => 0, "function" => "smartmetermessage");
$topics['home/ESP_SMARTMETER/electricity/kwh_used1'] = array("qos" => 0, "function" => "smartmetermessage");
$topics['home/ESP_SMARTMETER/electricity/kwh_used2'] = array("qos" => 0, "function" => "smartmetermessage");
$topics['home/ESP_SMARTMETER/electricity/kw_using'] = array("qos" => 0, "function" => "smartmetermessage");
$topics['home/ESP_SMARTMETER/electricity/kw_providing'] = array("qos" => 0, "function" => "smartmetermessage");
$topics['home/ESP_SMARTMETER/gas/m3'] = array("qos" => 0, "function" => "smartmetermessage");
$topics['home/ESP_SMARTMETER/gas/datetime'] = array("qos" => 0, "function" => "smartmetermessage");
$topics['home/ESP_SMARTMETER/status'] = array("qos" => 0, "function" => "smartmetermessage");

$topics['home/ESP_WATERMETER/water/m3'] = array("qos" => 0, "function" => "watermetermessage");

$mqtt->subscribe($topics, 0);

while($mqtt->proc()){
         usleep(100000);
}


$mqtt->close();

function watermetermessage($topic, $msg)
{
        global $inisettings;
        global $mqtt;
        global $topicprefix;
        $watermeterdata = array();
	echo "$topic = $msg\n";
        $mysqli = mysqli_connect($inisettings["mysql"]["server"],$inisettings["mysql"]["username"],$inisettings["mysql"]["password"],$inisettings["mysql"]["database"]);

        if (($mysqli) && (!$mysqli->connect_errno))
        {
                        // Write values to database
      	                if (!$mysqli->query("INSERT INTO `watermeter` (m3) VALUES (".$msg.");"))
               	        {
                       	        echo "error writing watermeter values to database ".$mysqli->error."\n";
                        }
                        
                        $newarray = array();
                        
                        // Calculate values for today
                        if ($result = $mysqli->query("SELECT * FROM `watermeter` WHERE timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1"))
                        {
                                $row = $result->fetch_object();
                                $watermeterdata["today"]["m3"] = round($msg - $row->m3,3);
				$mqtt->publishwhenchanged ($topicprefix."watermeter/today/m3", $watermeterdata["today"]["m3"],0,1);
                        }
                        else
                        {
                                echo "error reading watermeter values from database ".$mysqli->error."\n";
                        }
        }
}

function smartmetermessage($topic, $msg){
	echo "$topic = $msg\n";
	static $mqttdata;
	global $mqtt;
	global $topicprefix;
	global $inisettings;
	static $lastgasdatetime;
	
	
	$mqttdata[$topic] = $msg;
	
	// If a counter has changed recalculate values
	if (($topic == 'home/ESP_SMARTMETER/status') && ($msg == 'ready') &&
	    isset($mqttdata['home/ESP_SMARTMETER/electricity/kwh_provided1']) && 
	    isset($mqttdata['home/ESP_SMARTMETER/electricity/kwh_provided2']) &&
	    isset($mqttdata['home/ESP_SMARTMETER/electricity/kwh_used1']) &&
	    isset($mqttdata['home/ESP_SMARTMETER/electricity/kwh_used2']) &&
	    isset($mqttdata['home/ESP_SMARTMETER/electricity/kw_using']) &&
	    isset($mqttdata['home/ESP_SMARTMETER/electricity/kw_providing']))
	{
		echo ("Calculating new kwh values...\n"); 
		
                $mysqli = mysqli_connect($inisettings["mysql"]["server"],$inisettings["mysql"]["username"],$inisettings["mysql"]["password"],$inisettings["mysql"]["database"]);

	        if (($mysqli) && (!$mysqli->connect_errno))
	        {
                        // Write values to database
       	                if (!$mysqli->query("INSERT INTO `electricitymeter` (kw_using, kw_providing, kwh_used1, kwh_used2, kwh_provided1, kwh_provided2) VALUES (".
                                             $mqttdata['home/ESP_SMARTMETER/electricity/kw_using'].",".
                                             $mqttdata['home/ESP_SMARTMETER/electricity/kw_providing'].",".
                                             $mqttdata['home/ESP_SMARTMETER/electricity/kwh_used1'].",".
                                             $mqttdata['home/ESP_SMARTMETER/electricity/kwh_used2'].",".
                                             $mqttdata['home/ESP_SMARTMETER/electricity/kwh_provided1'].",".
                                             $mqttdata['home/ESP_SMARTMETER/electricity/kwh_provided2'].");"))
               	        {
                       	        echo "error writing electricity values to database ".$mysqli->error."\n";
                        }
                        
                        $newarray = array();
                        
                        // Calculate values for today
                        if ($result = $mysqli->query("SELECT * FROM `electricitymeter` WHERE timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1"))
                        {
                                $row = $result->fetch_object();
                                $newdata["today"]["kwh_used1"] = round($mqttdata['home/ESP_SMARTMETER/electricity/kwh_used1'] - $row->kwh_used1,3);
                                $newdata["today"]["kwh_used2"]  = round($mqttdata['home/ESP_SMARTMETER/electricity/kwh_used2'] - $row->kwh_used2,3);
                                $newdata["today"]["kwh_provided1"] = round($mqttdata['home/ESP_SMARTMETER/electricity/kwh_provided1'] - $row->kwh_provided1,3);
                                $newdata["today"]["kwh_provided2"] = round($mqttdata['home/ESP_SMARTMETER/electricity/kwh_provided2'] - $row->kwh_provided2,3);
                                $newdata["today"]["kwh_used"] = round($newdata["today"]["kwh_used1"] + $newdata["today"]["kwh_used2"],3);
                                $newdata["today"]["kwh_provided"] = round($newdata["today"]["kwh_provided1"] + $newdata["today"]["kwh_provided2"],3);
                                $newdata["today"]["kwh_total"] = round($newdata["today"]["kwh_used"] - $newdata["today"]["kwh_provided"],3);
                                
				$mqtt->publishwhenchanged ($topicprefix."electricitymeter/today/kwh_used", $newdata["today"]["kwh_used"],0,1);
				$mqtt->publishwhenchanged ($topicprefix."electricitymeter/today/kwh_provided", $newdata["today"]["kwh_provided"],0,1);
				$mqtt->publishwhenchanged ($topicprefix."electricitymeter/today/kwh", $newdata["today"]["kwh_total"],0,1);
                        }
                        else
                        {
                                echo "error reading electricity values from database ".$mysqli->error."\n";
                        }
                        
                        
                        
                        // Calculate values from yesterday
                        if ($result = $mysqli->query("SELECT * FROM `electricitymeter` WHERE timestamp >= CURDATE() - INTERVAL 1 DAY ORDER BY timestamp ASC LIMIT 1"))
                        {
                                $row1 = $result->fetch_object();
                                if ($result = $mysqli->query("SELECT * FROM `electricitymeter` WHERE timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1"))
                                {
                                        $row2 = $result->fetch_object();
                                        $newdata["yesterday"]["kwh_used1"] = round($row2->kwh_used1 - $row1->kwh_used1,3);
                                        $newdata["yesterday"]["kwh_used2"]  = round($row2->kwh_used2 - $row1->kwh_used2,3);
                                        $newdata["yesterday"]["kwh_provided1"] = round($row2->kwh_provided1 - $row1->kwh_provided1,3);
                                        $newdata["yesterday"]["kwh_provided2"] = round($row2->kwh_provided2 - $row1->kwh_provided2,3);
                                        $newdata["yesterday"]["kwh_used"] = round($newdata["yesterday"]["kwh_used1"] + $newdata["yesterday"]["kwh_used2"],3);
                                        $newdata["yesterday"]["kwh_provided"] = round($newdata["yesterday"]["kwh_provided1"] + $newdata["yesterday"]["kwh_provided2"], 3);
                                        $newdata["yesterday"]["kwh_total"] = round($newdata["yesterday"]["kwh_used"] - $newdata["yesterday"]["kwh_provided"], 3);
                                        
                                        $mqtt->publishwhenchanged ($topicprefix."electricitymeter/yesterday/kwh_used", $newdata["yesterday"]["kwh_used"],0,1);
        	                        $mqtt->publishwhenchanged ($topicprefix."electricitymeter/yesterday/kwh_provided", $newdata["yesterday"]["kwh_provided"],0,1);
	                                $mqtt->publishwhenchanged ($topicprefix."electricitymeter/yesterday/kwh", $newdata["yesterday"]["kwh_total"],0,1);
                                }
                        }
                        else
                        {
                                echo "error reading electricity values from database ".$mysqli->error."\n";
                        }

                        // Calculate values from this month
                        if ($result = $mysqli->query("SELECT * FROM `electricitymeter` WHERE timestamp >= DATE_FORMAT(NOW() ,'%Y-%m-01') ORDER BY timestamp ASC LIMIT 1"))
                        {
                                $row = $result->fetch_object();
                                //var_dump ($row);
                                $newdata["month"]["kwh_used1"] = round($mqttdata['home/ESP_SMARTMETER/electricity/kwh_used1'] - $row->kwh_used1,3);
                                $newdata["month"]["kwh_used2"]  = round($mqttdata['home/ESP_SMARTMETER/electricity/kwh_used2'] - $row->kwh_used2,3);
                                $newdata["month"]["kwh_provided1"] = round($mqttdata['home/ESP_SMARTMETER/electricity/kwh_provided1'] - $row->kwh_provided1,3);
                                $newdata["month"]["kwh_provided2"] = round($mqttdata['home/ESP_SMARTMETER/electricity/kwh_provided2'] - $row->kwh_provided2,3);
                                $newdata["month"]["kwh_used"] = round($newdata["month"]["kwh_used1"] + $newdata["month"]["kwh_used2"],3);
                                $newdata["month"]["kwh_provided"] = round($newdata["month"]["kwh_provided1"] + $newdata["month"]["kwh_provided2"],3);
                                $newdata["month"]["kwh_total"] = round($newdata["month"]["kwh_used"] - $newdata["month"]["kwh_provided"],3);

                                $mqtt->publishwhenchanged ($topicprefix."electricitymeter/month/kwh_used", $newdata["month"]["kwh_used"],0,1);
                                $mqtt->publishwhenchanged ($topicprefix."electricitymeter/month/kwh_provided", $newdata["month"]["kwh_provided"],0,1);
                                $mqtt->publishwhenchanged ($topicprefix."electricitymeter/month/kwh", $newdata["month"]["kwh_total"],0,1);

                        }
                        else
                        {
                                echo "error reading electricity values from database ".$mysqli->error."\n";
                        }



                        // Calculate values from previous month
                        if ($result = $mysqli->query("SELECT * FROM `electricitymeter` WHERE timestamp >= DATE_FORMAT(NOW() ,'%Y-%m-01') - INTERVAL 1 MONTH ORDER BY timestamp ASC limit 1"))
                        {
                                $row1 = $result->fetch_object();
                                if ($result = $mysqli->query("SELECT * FROM `electricitymeter` WHERE timestamp >= DATE_FORMAT(NOW() ,'%Y-%m-01') ORDER BY timestamp ASC limit 1"))
                                {
                                        $row2 = $result->fetch_object();
                                        //var_dump ($row);
                                        $newdata["lastmonth"]["kwh_used1"] = round($row2->kwh_used1 - $row1->kwh_used1,3);
                                        $newdata["lastmonth"]["kwh_used2"]  = round($row2->kwh_used2 - $row1->kwh_used2,3);
                                        $newdata["lastmonth"]["kwh_provided1"] = round($row2->kwh_provided1 - $row1->kwh_provided1,3);
                                        $newdata["lastmonth"]["kwh_provided2"] = round($row2->kwh_provided2 - $row1->kwh_provided2,3);
                                        $newdata["lastmonth"]["kwh_used"] = round($newdata["lastmonth"]["kwh_used1"] + $newdata["lastmonth"]["kwh_used2"],3);
                                        $newdata["lastmonth"]["kwh_provided"] = round($newdata["lastmonth"]["kwh_provided1"] + $newdata["lastmonth"]["kwh_provided2"],3);
                                        $newdata["lastmonth"]["kwh_total"] = round($newdata["lastmonth"]["kwh_used"] - $newdata["lastmonth"]["kwh_provided"],3);

                                        $mqtt->publishwhenchanged ($topicprefix."electricitymeter/lastmonth/kwh_used", $newdata["lastmonth"]["kwh_used"],0,1);
                                        $mqtt->publishwhenchanged ($topicprefix."electricitymeter/lastmonth/kwh_provided", $newdata["lastmonth"]["kwh_provided"],0,1);
                                        $mqtt->publishwhenchanged ($topicprefix."electricitymeter/lastmonth/kwh", $newdata["lastmonth"]["kwh_total"],0,1);
                                }
                        }
                        else
                        {
                                echo "error reading electricity values from database ".$mysqli->error."\n";

                        }

                        // Calculate values from this year
                        if ($result = $mysqli->query("SELECT * FROM `electricitymeter` WHERE timestamp >= DATE_FORMAT(NOW() ,'%Y-01-01') ORDER BY timestamp ASC LIMIT 1"))
                        {
                                $row = $result->fetch_object();
                                //var_dump ($row);
                                if (isset($row))
                                {
                                        $newdata["year"]["kwh_used1"] = round($mqttdata['home/ESP_SMARTMETER/electricity/kwh_used1'] - $row->kwh_used1,3);
                                        $newdata["year"]["kwh_used2"]  = round($mqttdata['home/ESP_SMARTMETER/electricity/kwh_used2'] - $row->kwh_used2,3);
                                        $newdata["year"]["kwh_provided1"] = round($mqttdata['home/ESP_SMARTMETER/electricity/kwh_provided1'] - $row->kwh_provided1,3);
                                        $newdata["year"]["kwh_provided2"] = round($mqttdata['home/ESP_SMARTMETER/electricity/kwh_provided2']  - $row->kwh_provided2,3);
                                        $newdata["year"]["kwh_used"] = round($newdata["year"]["kwh_used1"] + $newdata["year"]["kwh_used2"],3);
                                        $newdata["year"]["kwh_provided"] = round($newdata["year"]["kwh_provided1"] + $newdata["year"]["kwh_provided2"],3);
                                        $newdata["year"]["kwh_total"] = round($newdata["year"]["kwh_used"] - $newdata["year"]["kwh_provided"],3);

                                        $mqtt->publishwhenchanged ($topicprefix."electricitymeter/year/kwh_used", $newdata["year"]["kwh_used"],0,1);
                                        $mqtt->publishwhenchanged ($topicprefix."electricitymeter/year/kwh_provided", $newdata["year"]["kwh_provided"],0,1);
                                        $mqtt->publishwhenchanged ($topicprefix."electricitymeter/year/kwh", $newdata["year"]["kwh_total"],0,1);
                                }
                        }
                        else
                        {
                                echo "error reading electricity values from database ".$mysqli->error."\n";
                        }

                        // Calculate values from previous year
                        if ($result = $mysqli->query("SELECT * FROM `electricitymeter` WHERE timestamp >= DATE_FORMAT(NOW() ,'%Y-01-01') - INTERVAL 1 YEAR ORDER BY timestamp ASC LIMIT 1"))
                        {
                                $row1 = $result->fetch_object();
                                if ($result = $mysqli->query("SELECT * FROM `electricitymeter` WHERE timestamp >= DATE_FORMAT(NOW() ,'%Y-01-01') ORDER BY timestamp ASC LIMIT 1"))
                                {
                                        $row2 = $result->fetch_object();
                                        //var_dump ($row);
                                        $newdata["lastyear"]["kwh_used1"] = round($row2->kwh_used1 - $row1->kwh_used1,3);
                                        $newdata["lastyear"]["kwh_used2"]  = round($row2->kwh_used2 - $row1->kwh_used2,3);
                                        $newdata["lastyear"]["kwh_provided1"] = round($row2->kwh_provided1 - $row1->kwh_provided1,3);
                                        $newdata["lastyear"]["kwh_provided2"] = round($row2->kwh_provided2 - $row1->kwh_provided2,3);
                                        $newdata["lastyear"]["kwh_used"] = round($newdata["lastyear"]["kwh_used1"] + $newdata["lastyear"]["kwh_used2"],3);
                                        $newdata["lastyear"]["kwh_provided"] = round($newdata["lastyear"]["kwh_provided1"] + $newdata["lastyear"]["kwh_provided2"],3);
                                        $newdata["lastyear"]["kwh_total"] = round($newdata["lastyear"]["kwh_used"] - $newdata["lastyear"]["kwh_provided"],3);
                                        
                                        $mqtt->publishwhenchanged ($topicprefix."electricitymeter/lastyear/kwh_used", $newdata["lastyear"]["kwh_used"],0,1);
                                        $mqtt->publishwhenchanged ($topicprefix."electricitymeter/lastyear/kwh_provided", $newdata["lastyear"]["kwh_provided"],0,1);
                                        $mqtt->publishwhenchanged ($topicprefix."electricitymeter/lastyear/kwh", $newdata["lastyear"]["kwh_total"],0,1);
                                }
                        }
                        else
                        {
                                echo "error reading electricity values from database ".$mysqli->error."\n";

                        }

                        // Creating day graph data
                        $daykwharray = array();
                        $kwhhour = null;
                        $kwhprevhour = null;
                        $hour = 24;
                        while ($hour >= 0)
                        {
                                if ($result = $mysqli->query("
                                        SELECT *, DATE(timestamp) as date, HOUR(timestamp) as hour
                                        FROM `electricitymeter` 
                                        WHERE timestamp > FROM_UNIXTIME(unix_timestamp(now()) - SECOND(now()) - (MINUTE(now())*60)) - INTERVAL ".$hour." HOUR 
                                        AND timestamp < FROM_UNIXTIME(unix_timestamp(now()) - SECOND(now()) - (MINUTE(now())*60)) - INTERVAL ".($hour - 1)." HOUR 
                                        ORDER BY `electricitymeter`.`timestamp` DESC LIMIT 1"))
                                {
                                        $row = $result->fetch_object();
                                        if ($row) 
                                        {
                                                $kwhhour = $row->kwh_used1 + $row->kwh_used2 - $row->kwh_provided1 - $row->kwh_provided2;
                                                if ($kwhprevhour != null)
                                                {
                                                        $daykwharray[$row->date." ".$row->hour.":00"]  = round($kwhhour - $kwhprevhour,3);
                                                }
                                                $kwhprevhour = $kwhhour;
                                        }
                                        else 
                                        {
                                                $kwhprevhour = null;
                                        }
                                        
                                }
                                else
                                {
                                        $kwhprevhour = null;
                                        echo "error reading electricity values from database ".$mysqli->error."\n";
                                }
                                $hour--;
                        }
                        $mqtt->publishwhenchanged ($topicprefix."electricity/day/graph/kwh", json_encode($daykwharray), 0, 1);





                        // Creating month graph data
                        $monthkwharray = array();
                        $kwhtoday = null;
                        $kwhyesterday = null;
                        $day = 31;
                        while ($day >= 0)
                        {
                                if ($result = $mysqli->query("SELECT *, DATE(timestamp) as date FROM `electricitymeter` WHERE timestamp BETWEEN DATE(NOW()) - INTERVAL ".$day." DAY AND DATE(NOW()) - INTERVAL ".$day." DAY + INTERVAL 24 HOUR ORDER BY `electricitymeter`.`timestamp` DESC LIMIT 1"))
                                {
                                        $row = $result->fetch_object();
                                        if ($row) 
                                        {
                                                $kwhtoday = $row->kwh_used1 + $row->kwh_used2 - $row->kwh_provided1 - $row->kwh_provided2;
                                                if ($kwhyesterday != null)
                                                {
                                                        $monthkwharray[$row->date]  = round($kwhtoday - $kwhyesterday, 3);
                                                }
                                                $kwhyesterday = $kwhtoday;
                                        }
                                        else $kwhyesterday = null;
                                        
                                }
                                else
                                {
                                        $kwhyesterday = null;
                                        echo "error reading electricity values from database ".$mysqli->error."\n";
                                }
                                $day--;
                        }
                        $mqtt->publishwhenchanged ($topicprefix."electricity/month/graph/kwh", json_encode($monthkwharray), 0, 1);

                        // Creating year graph data for electricity
                        $yearkwharray = array();
                        $kwhweek = null;
                        $kwhprevweek = null;
                        $week = 52;
                        while ($week >= 0)
                        {
                                if ($result = $mysqli->query("SELECT *, YEAR(timestamp) as year, WEEK(timestamp,3 ) as week FROM `electricitymeter` WHERE timestamp BETWEEN DATE(NOW()) - INTERVAL ".$week." WEEK AND DATE(NOW()) - INTERVAL ".$week." WEEK + INTERVAL 24 HOUR ORDER BY `electricitymeter`.`timestamp` DESC LIMIT 1"))
                                {
                                        $row = $result->fetch_object();
                                        if ($row) 
                                        {
                                                $kwhweek = $row->kwh_used1 + $row->kwh_used2 - $row->kwh_provided1 - $row->kwh_provided2;
                                                if ($kwhprevweek != null)
                                                {
                                                        $yearkwharray[$row->year."-".$row->week]  = round($kwhweek - $kwhprevweek, 3);
                                                }
                                                $kwhprevweek = $kwhweek;
                                        }
                                        else $kwhprevweek = null;
                                        
                                }
                                else
                                {
                                        $kwhprevweek = null;
                                        echo "error reading electricity values from database ".$mysqli->error."\n";
                                }
                                $week--;
                        }
                        $mqtt->publishwhenchanged ($topicprefix."electricity/year/graph/kwh", json_encode($yearkwharray), 0, 1);

                        
                        $mysqli->close();
		}
		else
		{
			echo "Connection to myqsl failed!\n";
		}
		

		
	}
	
        if (($topic == 'home/ESP_SMARTMETER/status') && ($msg == 'ready') &&
            isset($mqttdata['home/ESP_SMARTMETER/gas/m3']) &&
            isset($mqttdata['home/ESP_SMARTMETER/gas/datetime']) &&
            ($lastgasdatetime != $mqttdata['home/ESP_SMARTMETER/gas/datetime']))
        {
                echo "Calculating new gas values...\n";
                $mysqli = mysqli_connect($inisettings["mysql"]["server"],$inisettings["mysql"]["username"],$inisettings["mysql"]["password"],$inisettings["mysql"]["database"]);

	        $lastgasdatetime = $mqttdata['home/ESP_SMARTMETER/gas/datetime'];
	        if (($mysqli) && (!$mysqli->connect_errno))
	        {
	                // Write values to database
                        $sql = "INSERT INTO `gasmeter` (timestamp, m3) VALUES ('".$mqttdata['home/ESP_SMARTMETER/gas/datetime']."','" 
                               .$mqttdata['home/ESP_SMARTMETER/gas/m3']."');";
                        echo $sql;
                        if (!$mysqli->query($sql))
                        {
                                echo "error writing gas values to database ".$mysqli->error."\n";
                        }

                        $newarray = array();


                        // Calculate gas hour
                        if ($result = $mysqli->query("SELECT * FROM `gasmeter` WHERE timestamp >= DATE_SUB(NOW(), INTERVAL 1 HOUR) ORDER BY timestamp ASC LIMIT 1"))
                        {
                                $row = $result->fetch_object();
                                //var_dump ($row);
                                if ($row)
                                {
                                        $newdata["m3h"] = round($mqttdata['home/ESP_SMARTMETER/gas/m3'] - $row->m3,3);
                                }
                                else
                                {
                                        $newdata["m3h"] = "";
                                }
                        }
                        else
                        {
                                echo "no gas values from database ".$mysqli->error."\n";
                                $newdata["m3h"] = "-";
                        }
                        $mqtt->publishwhenchanged ($topicprefix."gasmeter/m3h", $newdata["m3h"],0,1);

                        // Calculate gas today
                        if ($result = $mysqli->query("SELECT * FROM `gasmeter` WHERE timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1"))
                        {
                                $row = $result->fetch_object();
                                //var_dump ($row);
                                $newdata["today"]["m3"] = round($mqttdata['home/ESP_SMARTMETER/gas/m3'] - $row->m3, 3);
                        }
                        else
                        {
                                echo "error reading gas values from database ".$mysqli->error."\n";
                                $newdata["today"]["m3"] = "";
                        }
                        $mqtt->publishwhenchanged ($topicprefix."gasmeter/today/m3", $newdata["today"]["m3"],0,1);


                        // Calculate values from yesterday
                        if ($result = $mysqli->query("SELECT * FROM `gasmeter` WHERE timestamp >= CURDATE() - INTERVAL 1 DAY ORDER BY timestamp ASC LIMIT 1"))
                        {
                                $row1 = $result->fetch_object();
                                if ($result = $mysqli->query("SELECT * FROM `gasmeter` WHERE timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1"))
                                {
                                        $row2 = $result->fetch_object();
                                        //var_dump ($row);
                                        $newdata["yesterday"]["m3"] = round($row2->m3 - $row1->m3,3);
                                }
                        }
                        else
                        {
                                echo "error reading gas values from database ".$mysqli->error."\n";
                        }
                        $mqtt->publishwhenchanged ($topicprefix."gas/yesterday/m3", $newdata["yesterday"]["m3"],0,1);


                        // Calculate values from this month
                        if ($result = $mysqli->query("SELECT * FROM `gasmeter` WHERE timestamp >= DATE_FORMAT(NOW() ,'%Y-%m-01') ORDER BY timestamp ASC LIMIT 1"))
                        {
                                $row = $result->fetch_object();
                                //var_dump ($row);
                                $newdata["month"]["m3"] = round($mqttdata['home/ESP_SMARTMETER/gas/m3'] - $row->m3,3);
                        }
                        else
                        {
                                echo "error reading gas values from database ".$mysqli->error."\n";
                        }
                        $mqtt->publishwhenchanged ($topicprefix."gas/month/m3", $newdata["month"]["m3"],0,1);


                        // Calculate values from previous month
                        if ($result = $mysqli->query("SELECT * FROM `gasmeter` WHERE timestamp >= DATE_FORMAT(NOW() ,'%Y-%m-01') - INTERVAL 1 MONTH ORDER BY timestamp ASC LIMIT 1"))
                        {
                                $row1 = $result->fetch_object();
                                if ($result = $mysqli->query("SELECT * FROM `gasmeter` WHERE timestamp >= DATE_FORMAT(NOW() ,'%Y-%m-01') ORDER BY timestamp ASC LIMIT 1"))
                                {
                                        $row2 = $result->fetch_object();
                                        //var_dump ($row);
                                        $newdata["lastmonth"]["m3"] = round($row2->m3 - $row1->m3,3);
                                }
                        }
                        else
                        {
                                echo "error reading gas values from database ".$mysqli->error."\n";

                        }
                        $mqtt->publishwhenchanged ($topicprefix."gas/lastmonth/m3", $newdata["lastmonth"]["m3"],0,1);


                        // Calculate values from this year
                        if ($result = $mysqli->query("SELECT * FROM `gasmeter` WHERE timestamp >= DATE_FORMAT(NOW() ,'%Y-01-01') ORDER BY timestamp ASC LIMIT 1"))
                        {
                                $row = $result->fetch_object();
                                //var_dump ($row);
                                if (isset($row))
                                {
                                        $newdata["year"]["m3"] = round($mqttdata['home/ESP_SMARTMETER/gas/m3'] - $row->m3,3);
                                }
                        }
                        else
                        {
                                echo "error reading gas values from database ".$mysqli->error."\n";
                        }
                        $mqtt->publishwhenchanged ($topicprefix."gas/year/m3", $newdata["year"]["m3"],0,1);

                        // Calculate values from previous year
                        if ($result = $mysqli->query("SELECT * FROM `gasmeter` WHERE timestamp >= DATE_FORMAT(NOW() ,'%Y-01-01') - INTERVAL 1 YEAR ORDER BY timestamp ASC LIMIT 1"))
                        {
                                $row1 = $result->fetch_object();
                                if ($result = $mysqli->query("SELECT * FROM `gasmeter` WHERE timestamp >= DATE_FORMAT(NOW() ,'%Y-01-01') ORDER BY timestamp ASC LIMIT 1"))
                                {
                                        $row2 = $result->fetch_object();
                                        //var_dump ($row);
                                        $newdata["lastyear"]["m3"] = round($row2->m3 - $row1->m3,3);
                                }
                        }
                        else
                        {
                                echo "error reading gas values from database ".$mysqli->error."\n";

                        }
                        $mqtt->publishwhenchanged ($topicprefix."gas/lastyear/m3", $newdata["lastyear"]["m3"],0,1);

                        // Creating day graph data for gas
                        $daym3array = array();
                        $m3hour = null;
                        $m3prevhour = null;
                        $hour = 24;
                        while ($hour >= 0)
                        {
                                if ($result = $mysqli->query("
                                        SELECT *, DATE(timestamp) as date, HOUR(timestamp) as hour
                                        FROM `gasmeter` 
                                        WHERE timestamp > FROM_UNIXTIME(unix_timestamp(now()) - SECOND(now()) - (MINUTE(now())*60)) - INTERVAL ".$hour." HOUR - INTERVAL 1 SECOND
                                        AND timestamp < FROM_UNIXTIME(unix_timestamp(now()) - SECOND(now()) - (MINUTE(now())*60)) - INTERVAL ".($hour - 1)." HOUR 
                                        ORDER BY `gasmeter`.`timestamp` DESC LIMIT 1"))
                                {
                                        $row = $result->fetch_object();
                                        var_dump($row);
                                        if ($row) 
                                        {
                                                $m3hour = $row->m3;
                                                if ($m3prevhour != null)
                                                {
                                                        $daym3array[$row->date." ".$row->hour.":00"]  = round($m3hour - $m3prevhour,3);
                                                }
                                                $m3prevhour = $m3hour;
                                        }
                                        else 
                                        {
                                                $m3prevhour = null;
                                        }
                                        
                                }
                                else
                                {
                                        $m3prevhour = null;
                                        echo "error reading gas values from database ".$mysqli->error."\n";
                                }
                                $hour--;
                        }
                        $mqtt->publishwhenchanged ($topicprefix."gas/day/graph/m3", json_encode($daym3array), 0, 1);


                        // Creating month graph data for gas
                        $montm3array = array();
                        $m3today = null;
                        $m3yesterday = null;
                        $day = 31;
                        while ($day >= 0)
                        {
                                if ($result = $mysqli->query("SELECT *, DATE(timestamp) as date FROM `gasmeter` WHERE timestamp BETWEEN DATE(NOW()) - INTERVAL ".$day." DAY AND DATE(NOW()) - INTERVAL ".$day." DAY + INTERVAL 24 HOUR ORDER BY `gasmeter`.`timestamp` DESC LIMIT 1"))
                                {
                                        $row = $result->fetch_object();
                                        if ($row) 
                                        {
                                                $m3today = $row->m3;
                                                if ($m3yesterday != null)
                                                {
                                                        $monthm3array[$row->date]  = round($m3today - $m3yesterday, 3);
                                                }
                                                $m3yesterday = $m3today;
                                        }
                                        else $m3yesterday = null;
                                        
                                }
                                else
                                {
                                        $m3yesterday = null;
                                        echo "error reading gas values from database ".$mysqli->error."\n";
                                }
                                $day--;
                        }
                        $mqtt->publishwhenchanged ($topicprefix."gas/month/graph/m3", json_encode($monthm3array), 0, 1);

                        // Creating year graph data for gas
                        $yearm3array = array();
                        $m3week = null;
                        $m3prevweek = null;
                        $week = 52;
                        while ($week >= 0)
                        {
                                if ($result = $mysqli->query("SELECT *, YEAR(timestamp) as year, WEEK(timestamp,3 ) as week FROM `gasmeter` WHERE timestamp BETWEEN DATE(NOW()) - INTERVAL ".$week." WEEK AND DATE(NOW()) - INTERVAL ".$week." WEEK + INTERVAL 24 HOUR ORDER BY `gasmeter`.`timestamp` DESC LIMIT 1"))
                                {
                                        $row = $result->fetch_object();
                                        if ($row) 
                                        {
                                                $m3week = $row->m3;
                                                if ($m3prevweek != null)
                                                {
                                                        $yearm3array[$row->year."-".$row->week]  = round($m3week - $m3prevweek, 3);
                                                }
                                                $m3prevweek = $m3week;
                                        }
                                        else $m3prevweek = null;
                                        
                                }
                                else
                                {
                                        $m3prevweek = null;
                                        echo "error reading gas values from database ".$mysqli->error."\n";
                                }
                                $week--;
                        }
                        $mqtt->publishwhenchanged ($topicprefix."gas/year/graph/m3", json_encode($yearm3array), 0, 1);

                        $mysqli->close();

	        }
                else
                {
                        echo "Connection to myqsl failed!\n";
                }

        }

}
