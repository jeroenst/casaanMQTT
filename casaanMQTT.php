#!/usr/bin/php
<?php

require(realpath(dirname(__FILE__))."/../phpMQTT/phpMQTT.php");

$client_id = uniqid("casaanMQTT_"); // make sure this is unique for connecting to sever - you could use uniqid()
$topicprefix = 'home/casaan/';

$inisettings = parse_ini_file("casaanMQTT.ini",true);

var_dump($inisettings);

$mqttdata = array();

$starttime = time();
$mqtt = new phpMQTT($inisettings["mqtt"]["server"], $inisettings["mqtt"]["port"], $client_id);

$statustopic = "home/casaan/status";
$will = array();
$will["topic"] = $statustopic;
$will["content"] = "offline";
$will["qos"] = 1;
$will["retain"] = 1;

$lastgasdatetime = "";
$lastmqttstate = "offline";
$firstrun = true;

while (1)
{
while (!$mqtt->connect(true, $will, $inisettings["mqtt"]["username"], $inisettings["mqtt"]["password"])) 
{
	sleep(5);
}
$firstrun = true;
$mqtt->publish($statustopic, "online", 1, 1);


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

$topics['home/ESP_GROWATT/#'] = array("qos" => 0, "function" => "growattmessage");

$topics['home/ESP_SDM120/energy/active'] = array("qos" => 0, "function" => "sdm120message");

$topics['home/ESP_WEATHER/rain/pulse'] = array("qos" => 0, "function" => "rainpulsemessage");

$topics['home/SONOFF_TV/energy/kwh'] = array("qos" => 0, "function" => "kwhdata");
$topics['home/SONOFF_SERVER/energy/kwh'] = array("qos" => 0, "function" => "kwhdata");
$topics['home/SONOFF_DISHWASHER/energy/kwh'] = array("qos" => 0, "function" => "kwhdata");
$topics['home/SONOFF_WASHINGMACHINE/energy/kwh'] = array("qos" => 0, "function" => "kwhdata");

$mysqli = false;

$mqtt->subscribe($topics, 0);
$oldtime = 0;
$olddate = date('dmy');
while($mqtt->proc())
{
  if ((!$mysqli) || ($mysqli->connect_errno) || (!mysqli_ping($mysqli)))
  {
  	if ($mysqli) mysqli_close($mysqli);
  	$mysqli = mysqli_connect($inisettings["mysql"]["server"],$inisettings["mysql"]["username"],$inisettings["mysql"]["password"],$inisettings["mysql"]["database"]);
  	if ((!$mysqli) || ($mysqli->connect_errno)) sleep (5);
  	else raincalculateandsend();
  }
  usleep(10000);

  if(time() != $oldtime) 
  {
 		$oldtime = time();
//		$mqtt->publishwhenchanged ("time/seconds", time(),0,1);
//		$mqtt->publishwhenchanged ("time/ISO-8601", date("Y-m-d\TH:i:sO"),0,1);		
  }
	
  if(date('dmy') != $olddate)
  {
	$olddate = date('dmy');
	raincalculateandsend();
  }
  
        $uptime = time() - $starttime;
        if (($uptime % 60 == 0) || $firstrun)
        {
                $s = time()-$starttime;
                $uptimestr = sprintf('%d:%02d:%02d:%02d', $s/86400, $s/3600%24, $s/60%60, $s%60);
                $mqtt->publishwhenchanged("home/casaan/system/uptime", $uptimestr, 1, 1);
        }
  
  $firstrun = false;
}
}


$mqtt->close();
$mysqli->close();



function rainpulsemessage($topic, $msg){
	echo "$topic = $msg\n";
	global $mysqli;
  if (($mysqli) && (!$mysqli->connect_errno))
  {
                        // Write values to database
                        if (!$mysqli->query("INSERT INTO `rainsensor` () VALUES ();"))
               	        {
                       	        echo "error writing rainsensor to database ".$mysqli->error."\n";
                        }
		}
		else
		{
			echo "Connection to myqsl failed!\n";
		}
		raincalculateandsend();
}

function raincalculateandsend(){
	global $mysqli;
	global $topicprefix;
	global $mqtt;
  if (($mysqli) && (!$mysqli->connect_errno))
  {
    // Calculate rain for today
    if ($result = $mysqli->query("SELECT COUNT(id) AS numberofpulses FROM `rainsensor` WHERE timestamp >= CURDATE();"))
    {
    	$row = $result->fetch_object();
	$mqtt->publishwhenchanged ($topicprefix."weather/today/rain/pulses", $row->numberofpulses,0,1);
     	$mqtt->publishwhenchanged ($topicprefix."weather/today/rain/mm", $row->numberofpulses*0.3636,0,1);
    }
  }
}

function kwhdata($topic, $msg)
{
	global $mysqli;
	$id = 0;
	static $whprevarray = array();
	
	echo ("################################# Received whdata from ".$topic."=".$msg."\n");

	if ($topic == "home/SONOFF_TV/energy/kwh")
	{
		$id = 1;
		$name = "tv";
	}
	
	if ($topic == "home/SONOFF_SERVER/energy/kwh")
	{
		$id = 2;
		$name = "server";
	}
	
	if ($topic == "home/SONOFF_DISHWASHER/energy/kwh")
	{
		$id = 3;
		$name = "dishwasher";
	}
	
	if ($topic == "home/SONOFF_WASHINGMACHINE/energy/kwh")
	{
		$id = 4;
		$name = "washingmachine";
	}
	

	if ($id > 0)
	{
		$wh = 0;
		if (isset($whprevarray[$id])) $wh = ($msg * 1000) - $whprevarray[$id];
		// Only record new data
		if ($wh > 0)
		{
		    echo ("wh = ".$wh."\n");
		    if ($result = $mysqli->query("SELECT wh FROM `whdata` WHERE id = ".$id.";"))
		    {
		    	$row = $result->fetch_object();
		    	if (!$row)
		    	{
			    if ($result = $mysqli->query("INSERT INTO `whdata` (`id`, `name`, `wh`) VALUES ('".$id."', '".$name."', '".$wh."');"))
			    {
			    }
			    else
			    {
			    	echo ("ERROR: INSERTING WHDATA FAILED!".$mysqli->error."\n");
			    }
		    	}
		    	else
		    	{
			    	$dbwh = $row->wh;
			    	echo ("dbwh = ".$dbwh."\n");
				if ($result = $mysqli->query("UPDATE `whdata` SET `wh` = '".($dbwh + $wh)."' WHERE `whdata`.`id` = ".$id.";"))
				{
				}
				else
				{
				    	echo ("ERROR: UPDATING WHDATA FAILED!".$mysqli->error."\n");
				}
			}
		    }
		}
		$whprevarray[$id] = ($msg * 1000);
	}
}


function smartmetermessage($topic, $msg){
	echo "$topic = $msg\n";
	static $mqttdata;
	global $mqtt;
	global $topicprefix;
	global $mysqli;
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
                        if ($result = $mysqli->query("SELECT * FROM `gasmeter` WHERE timestamp >= DATE_SUB(NOW(), INTERVAL 2 HOUR) ORDER BY timestamp ASC LIMIT 1"))
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

                        // Calculate gas day
                        if ($result = $mysqli->query("SELECT * FROM `gasmeter` WHERE timestamp >= DATE_SUB(NOW(), INTERVAL 1 DAY) ORDER BY timestamp ASC LIMIT 1"))
                        {
                                $row = $result->fetch_object();
                                //var_dump ($row);
                                if ($row)
                                {
                                        $newdata["day"]["m3"] = round($mqttdata['home/ESP_SMARTMETER/gas/m3'] - $row->m3,3);
                                }
                                else
                                {
                                        $newdata["day"]["m3"] = "";
                                }
                        }
                        else
                        {
                                echo "no gas values from database ".$mysqli->error."\n";
                                $newdata["day"]["m3h"] = "-";
                        }
                        $mqtt->publishwhenchanged ($topicprefix."gasmeter/day/m3", $newdata["day"]["m3"],0,1);

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
                        $mqtt->publishwhenchanged ($topicprefix."gasmeter/yesterday/m3", $newdata["yesterday"]["m3"],0,1);


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
                        $mqtt->publishwhenchanged ($topicprefix."gasmeter/month/m3", $newdata["month"]["m3"],0,1);


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
                        $mqtt->publishwhenchanged ($topicprefix."gasmeter/lastmonth/m3", $newdata["lastmonth"]["m3"],0,1);


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
                        $mqtt->publishwhenchanged ($topicprefix."gasmeter/year/m3", $newdata["year"]["m3"],0,1);

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
                        $mqtt->publishwhenchanged ($topicprefix."gasmeter/lastyear/m3", $newdata["lastyear"]["m3"],0,1);

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
                                        //var_dump($row);
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
                        $mqtt->publishwhenchanged ($topicprefix."gasmeter/day/graph/m3", json_encode($daym3array), 0, 1);


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
                        $mqtt->publishwhenchanged ($topicprefix."gasmeter/month/graph/m3", json_encode($monthm3array), 0, 1);

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
                        $mqtt->publishwhenchanged ($topicprefix."gasmeter/year/graph/m3", json_encode($yearm3array), 0, 1);


	        }
                else
                {
                        echo "Connection to myqsl failed!\n";
                }

        }

}

function watermetermessage($topic, $msg)
{
        global $mysqli;
        global $mqtt;
        global $topicprefix;
      	$newdata=array();
	echo "watermetermessage: $topic = $msg\n";
        
        if (($mysqli) && (!$mysqli->connect_errno) && ($topic == "home/ESP_WATERMETER/water/m3"))
        {
		        $m3 = $msg;
		      	$mysqli->query("INSERT INTO `watermeter` (m3) VALUES ('".$m3."');");
                	
              		$newdata["total"]["m3"] = $m3;
                        $mqtt->publishwhenchanged ($topicprefix."watermeter/total/m3", $newdata["total"]["m3"],0,1);

                        // Read values from database
                	if ($result = $mysqli->query("SELECT * FROM `watermeter` WHERE timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1")) 
                	{
                		$row = $result->fetch_object();
                		$newdata["today"]["m3"] = round($m3 - $row->m3,3);
                		//var_dump ($row);
			}
			else
			{
                        	echo "error reading water values from database ".$mysqli->error."\n"; 
                		$newdata["today"]["m3"] = 0;
                        }
			$mqtt->publishwhenchanged ($topicprefix."watermeter/today/m3", $newdata["today"]["m3"],0,1);

			// Read values from database
        	        if ($result = $mysqli->query("SELECT * FROM `watermeter` WHERE timestamp >= CURDATE() - INTERVAL 1 DAY AND timestamp < CURDATE() ORDER BY timestamp ASC LIMIT 1")) 
        	        {
	                	$row = $result->fetch_object();
	                	if ($row)
	                	{
					$newdata['yesterday']['m3'] = round($newdata["total"]["m3"] - $row->m3 - $newdata["today"]["m3"],3);
					$mqtt->publishwhenchanged ($topicprefix."watermeter/yesterday/m3", $newdata["yesterday"]["m3"],0,1);
				}
			}
			else
			{
                	       	echo "error reading water values from database ".$mysqli->error."\n"; 
	                }

			// Read values from database
        	        if ($result = $mysqli->query("SELECT * FROM `watermeter` WHERE timestamp >= CURDATE() - INTERVAL 1 MONTH AND timestamp < CURDATE() - INTERVAL 1 MONTH + INTERVAL 1 DAY ORDER BY timestamp ASC LIMIT 1")) 
        	        {
	                	$row = $result->fetch_object();
	                	if ($row)
	                	{
					$newdata['month']['m3'] = round($newdata["total"]["m3"]  - $row->m3, 3);
					$mqtt->publishwhenchanged ($topicprefix."watermeter/month/m3", $newdata["month"]["m3"],0,1);
				}
			}
			else
			{
                	       	echo "error reading water values from database ".$mysqli->error."\n"; 
	                }

                        // Read values from database
                        if ($result = $mysqli->query("SELECT * FROM `watermeter` WHERE timestamp >= DATE_FORMAT(NOW() ,'%Y-01-01') ORDER BY timestamp ASC LIMIT 1"))
                        {
                                $row = $result->fetch_object();
                                if ($row)
                                {
                                	$newdata['year']['m3'] = round($newdata["total"]["m3"]  - $row->m3, 3);
                                	$mqtt->publishwhenchanged ($topicprefix."watermeter/year/m3", $newdata["year"]["m3"],0,1);
				}
                        }
                        else
                        {
                                echo "error reading water values from database ".$mysqli->error."\n";
                        }
                        
                        // Read values from database
        	        if ($result = $mysqli->query("SELECT * FROM `watermeter` WHERE timestamp >= CURDATE() - INTERVAL 2 MONTH AND timestamp < CURDATE() - INTERVAL 2 MONTH + INTERVAL 1 DAY ORDER BY timestamp DESC LIMIT 1")) 
        	        {
	                	$row = $result->fetch_object();
	                	if ($row)
	                	{
					$newdata['lastmonth']['m3'] = round($newdata['total']['m3'] - $row->m3 - $newdata['month']['m3'], 3);
					$mqtt->publishwhenchanged ($topicprefix."watermeter/lastmonth/m3", $newdata["lastmonth"]["m3"],0,1);
				}
			}
			else
			{
                	       	echo "error reading water values from database ".$mysqli->error."\n"; 
	                }

                        // Read values from database
                        if ($result = $mysqli->query("SELECT * FROM `watermeter` WHERE timestamp >= DATE_FORMAT(NOW() ,'%Y-01-01') - INTERVAL 1 YEAR AND timestamp < DATE_FORMAT(NOW() ,'%Y-01-01') - INTERVAL 1 YEAR + INTERVAL 1 DAY ORDER BY timestamp ASC LIMIT 1"))
                        {
                                $row = $result->fetch_object();
                                if ($row)
                                {
                                	$newdata['lastyear']['m3'] = round($newdata['total']['m3'] - $row->m3 - $newdata['year']['m3'], 3);
                                	$mqtt->publishwhenchanged ($topicprefix."watermeter/lastyear/m3", $newdata["lastyear"]["m3"],0,1);
				}
                        }
                        else
                        {
                                echo "error reading water values from database ".$mysqli->error."\n";
                        }
        }
}

function sdm120message($topic, $msg)
{
        global $mysqli;
        global $mqtt;
        global $topicprefix;
      	$newdata=array();
	echo "$topic = $msg\n";
        
        $kwh = $msg;
        if (($mysqli) && (!$mysqli->connect_errno) && ($topic == "home/ESP_SDM120/energy/active"))
        {
		      	$mysqli->query("INSERT INTO `sdm120` (kwh) VALUES (".$kwh.");");
                	
              		$newdata["total"]["kwh"] = $kwh;
                        $mqtt->publishwhenchanged ($topicprefix."sdm120/total/kwh", $newdata["total"]["kwh"],0,1);

                        // Read values from database
                	if ($result = $mysqli->query("SELECT * FROM `sdm120` WHERE timestamp >= CURDATE() ORDER BY timestamp ASC LIMIT 1")) 
                	{
                		$row = $result->fetch_object();
                		$newdata["today"]["kwh"] = round($kwh - $row->kwh,3);
                		//var_dump ($row);
			}
			else
			{
                        	echo "error reading sdm120 values from database ".$mysqli->error."\n"; 
                		$newdata["today"]["kwh"] = 0;
                        }
			$mqtt->publishwhenchanged ($topicprefix."sdm120/today/kwh", $newdata["today"]["kwh"],0,1);

			// Read values from database
        	        if ($result = $mysqli->query("SELECT * FROM `sdm120` WHERE timestamp >= CURDATE() - INTERVAL 1 DAY AND timestamp < CURDATE() ORDER BY timestamp ASC LIMIT 1")) 
        	        {
	                	$row = $result->fetch_object();
	                	if ($row)
	                	{
					$newdata['yesterday']['kwh'] = round($newdata["total"]["kwh"] - $row->kwh - $newdata["today"]["kwh"],3);
					$mqtt->publishwhenchanged ($topicprefix."sdm120/yesterday/kwh", $newdata["yesterday"]["kwh"],0,1);
				}
			}
			else
			{
                	       	echo "error reading sdm120 values from database ".$mysqli->error."\n"; 
	                }

			// Read values from database
        	        if ($result = $mysqli->query("SELECT * FROM `sdm120` WHERE timestamp >= CURDATE() - INTERVAL 1 MONTH AND timestamp < CURDATE() - INTERVAL 1 MONTH + INTERVAL 1 DAY ORDER BY timestamp ASC LIMIT 1")) 
        	        {
	                	$row = $result->fetch_object();
	                	if ($row)
	                	{
					$newdata['month']['kwh'] = round($newdata["total"]["kwh"]  - $row->kwh, 3);
					$mqtt->publishwhenchanged ($topicprefix."sdm120/month/kwh", $newdata["month"]["kwh"],0,1);
				}
			}
			else
			{
                	       	echo "error reading sdm120 values from database ".$mysqli->error."\n"; 
	                }

                        // Read values from database
                        if ($result = $mysqli->query("SELECT * FROM `sdm120` WHERE timestamp >= DATE_FORMAT(NOW() ,'%Y-01-01') AND timestamp < DATE_FORMAT(NOW() ,'%Y-01-01') + INTERVAL 1 DAY ORDER BY timestamp ASC LIMIT 1"))
                        {
                                $row = $result->fetch_object();
                                if ($row)
                                {
                                	$newdata['year']['kwh'] = round($newdata["total"]["kwh"]  - $row->kwh, 3);
                                	$mqtt->publishwhenchanged ($topicprefix."sdm120/year/kwh", $newdata["year"]["kwh"],0,1);
				}
                        }
                        else
                        {
                                echo "error reading sdm120 values from database ".$mysqli->error."\n";
                        }
                        
                        // Read values from database
        	        if ($result = $mysqli->query("SELECT * FROM `sdm120` WHERE timestamp >= CURDATE() - INTERVAL 2 MONTH AND timestamp < CURDATE() - INTERVAL 2 MONTH + INTERVAL 1 DAY ORDER BY timestamp DESC LIMIT 1")) 
        	        {
	                	$row = $result->fetch_object();
	                	if ($row)
	                	{
					$newdata['lastmonth']['kwh'] = round($newdata['total']['kwh'] - $row->kwh - $newdata['month']['kwh'], 3);
					$mqtt->publishwhenchanged ($topicprefix."sdm120/lastmonth/kwh", $newdata["lastmonth"]["kwh"],0,1);
				}
			}
			else
			{
                	       	echo "error reading sdm120 values from database ".$mysqli->error."\n"; 
	                }

                        // Read values from database
                        if ($result = $mysqli->query("SELECT * FROM `sdm120` WHERE timestamp >= DATE_FORMAT(NOW() ,'%Y-01-01') - INTERVAL 1 YEAR AND timestamp < DATE_FORMAT(NOW() ,'%Y-01-01') - INTERVAL 1 YEAR + INTERVAL 1 DAY ORDER BY timestamp ASC LIMIT 1"))
                        {
                                $row = $result->fetch_object();
                                if ($row)
                                {
                                	$newdata['lastyear']['kwh'] = round($newdata['total']['kwh'] - $row->m3 - $newdata['year']['kwh'], 3);
                                	$mqtt->publishwhenchanged ($topicprefix."sdm120/lastyear/kwh", $newdata["lastyear"]["kwh"],0,1);
				}
                        }
                        else
                        {
                                echo "error reading sdm120 values from database ".$mysqli->error."\n";
                        }
        }
}

function growattmessage($topic, $msg)
{
        global $mysqli;
        global $mqtt;
        global $topicprefix;
        $growattprefix = "home/ESP_GROWATT/";
      	static $newdata=array();
	echo "$topic = $msg\n";
	
        if ($topic == $growattprefix."pv/1/volt") $newdata['now']['pv']['1']['volt'] = $msg;
        if ($topic == $growattprefix."pv/2/volt") $newdata['now']['pv']['2']['volt'] = $msg;
        if ($topic == $growattprefix."pv/watt") $newdata['now']['pv']['watt'] = $msg;
        if ($topic == $growattprefix."grid/volt") $newdata['now']['grid']['volt'] = $msg;
        if ($topic == $growattprefix."grid/watt") $newdata['now']['grid']['watt'] = $msg;
        if ($topic == $growattprefix."grid/amp") $newdata['now']['grid']['amp'] = $msg;
        if ($topic == $growattprefix."grid/frequency") $newdata['now']['grid']['frequency'] = $msg;
        if ($topic == $growattprefix."grid/today/kwh") $newdata['today']['kwh'] = $msg;
        if ($topic == $growattprefix."grid/total/kwh") $newdata['total']['kwh'] = $msg;

        
        $totalnewdataitems = count($newdata, COUNT_RECURSIVE);
        
        echo ("count of newdata=".$totalnewdataitems."\n");
        
        if (($topic == $growattprefix."status") && ($msg == "ready") && ($totalnewdataitems >= 16))
        {
        	echo ("Received growatt data...\n");
	        if (($mysqli) && (!$mysqli->connect_errno))
	        {
	        	$sql = "INSERT INTO `sunelectricity` (pv_watt, pv_1_volt, pv_2_volt, grid_watt, grid_volt, grid_amp, grid_freq, kwh_today, kwh_total) VALUES ('".
                                                $newdata['now']['pv']['watt']."','".
                                                $newdata['now']['pv']['1']['volt']."','".
                                                $newdata['now']['pv']['2']['volt']."','".
                                                $newdata['now']['grid']['watt']."','".
                                                $newdata['now']['grid']['volt']."','".
                                                $newdata['now']['grid']['amp']."','".
                                                $newdata['now']['grid']['frequency']."','".
                                                $newdata['today']['kwh']."','".
                                                $newdata['total']['kwh']."');";
                                                
			echo $sql."\n";
			
			$result = $mysqli->query ($sql);
                        // write values from database
                        if (!$result)
                        {
                                echo "error writing sunelectricty values to database ".$mysqli->error."\n";
                        }
                                      

			// Read values from database
			echo ("Calculating yesterday...\n");
        	        if ($result = $mysqli->query("SELECT * FROM `sunelectricity` WHERE timestamp >= CURDATE() - INTERVAL 1 DAY AND timestamp < CURDATE() ORDER BY timestamp ASC LIMIT 1")) 
        	        {
	                	if ($row = $result->fetch_object())
	                	{
	                		$newdata['yesterday']['kwh'] = round($newdata['total']['kwh'] - $row->kwh_total - $newdata['today']['kwh'],1);
	                		$mqtt->publishwhenchanged ($topicprefix."growatt/grid/yesterday/kwh", $newdata["yesterday"]["kwh"],0,1);
				}
				else $mqtt->publishwhenchanged ($topicprefix."growatt/grid/yesterday/kwh", "-",0,1);
			}
			else
			{
                	       	echo "error reading sunelectricty values from database ".$mysqli->error."\n"; 
	                }


			echo ("Calculating month...\n");
			// Read values from database
        	        if ($result = $mysqli->query("SELECT * FROM `sunelectricity` WHERE timestamp >= CURDATE() - INTERVAL 1 MONTH AND timestamp < CURDATE() - INTERVAL 1 MONTH + INTERVAL 1 DAY ORDER BY timestamp ASC LIMIT 1")) 
        	        {
	                	if ($row = $result->fetch_object())
	                	{
					$newdata['month']['kwh'] = round($newdata['total']['kwh'] - $row->kwh_total, 1);
					$mqtt->publishwhenchanged ($topicprefix."growatt/grid/month/kwh", $newdata["month"]["kwh"],0,1);
				}
				else $mqtt->publishwhenchanged ($topicprefix."growatt/grid/month/kwh", "-",0,1);
			}
			else
			{
                	       	echo "error reading sunelectricty values from database ".$mysqli->error."\n"; 
	                }

			echo ("Calculating year...\n");
                        // Read values from database
                        if ($result = $mysqli->query("SELECT * FROM `sunelectricity` WHERE timestamp >= DATE_FORMAT(NOW() ,'%Y-01-01') AND timestamp < DATE_FORMAT(NOW() ,'%Y-01-02') ORDER BY timestamp ASC LIMIT 1"))
                        {
                                if ($row = $result->fetch_object())
                                {
                                	$newdata['year']['kwh'] = round($newdata['total']['kwh'] - $row->kwh_total, 1);
                                	$mqtt->publishwhenchanged ($topicprefix."growatt/grid/year/kwh", $newdata["year"]["kwh"],0,1);
				}
				else $mqtt->publishwhenchanged ($topicprefix."growatt/grid/year/kwh", "-",0,1);
                        }
                        else
                        {
                                echo "error reading sunelectricty values from database ".$mysqli->error."\n";
                        }
                        

			echo ("Calculating lastmonth...\n");
                        // Read values from database
        	        if ($result = $mysqli->query("SELECT * FROM `sunelectricity` WHERE timestamp >= CURDATE() - INTERVAL 2 MONTH AND timestamp < CURDATE() - INTERVAL 2 MONTH + INTERVAL 1 DAY ORDER BY timestamp DESC LIMIT 1")) 
        	        {
	                	if ($row = $result->fetch_object())
	                	{
					$newdata['lastmonth']['kwh'] = round($newdata['total']['kwh'] - $row->kwh_total - $newdata['month']['kwh'], 1);
					$mqtt->publishwhenchanged ($topicprefix."growatt/grid/lastmonth/kwh", $newdata["lastmonth"]["kwh"],0,1);
				}
				else $mqtt->publishwhenchanged ($topicprefix."growatt/grid/lastmonth/kwh", "-",0,1);

			}
			else
			{
                	       	echo "error reading sunelectricty values from database ".$mysqli->error."\n"; 
	                }

			echo ("Calculating lastyear...\n");
                        // Read values from database
                        if ($result = $mysqli->query("SELECT * FROM `sunelectricity` WHERE timestamp >= DATE_FORMAT(NOW() ,'%Y-01-01') - INTERVAL 1 YEAR AND timestamp < DATE_FORMAT(NOW() ,'%Y-01-01') ORDER BY timestamp ASC LIMIT 1"))
                        {
                                if ($row = $result->fetch_object())
                                {
                                	$newdata['lastyear']['kwh'] = round($newdata['total']['kwh'] - $row->kwh_total - $newdata['year']['kwh'], 1);
                                	$mqtt->publishwhenchanged ($topicprefix."growatt/grid/lastyear/kwh", $newdata["lastyear"]["kwh"],0,1);
				}
                               else $mqtt->publishwhenchanged ($topicprefix."growatt/grid/lastyear/kwh", "-",0,1);
                        }
                        else
                        {
                                echo "error reading sunelectricty values from database ".$mysqli->error."\n";
                                $mqtt->publishwhenchanged ($topicprefix."growatt/grid/lastyear/kwh", "-",0,1);
                        }
                        

			echo ("Calculating growatt values finished...\n");
		}
		else
		{
                	echo ("Error while writing water values to database: ".$mysqli->connect_error ."\n");
		}



	}
}
