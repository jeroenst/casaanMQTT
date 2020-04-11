<!DOCTYPE html>
<?php
/*
$username = html_entity_decode($_COOKIE["username"]);
$password = html_entity_decode($_COOKIE["password"]);

if (isset($_POST['password']))
{ 
	$username = html_entity_decode($_POST['username']);
	$password = html_entity_decode($_POST['password']);
	if (isset($_POST['remember']))
	{
		setcookie("username", $username, 0, '', '', 1);
		setcookie("password", $password, 0, '', '', 1);
	}
	else
	{
		setcookie("username", '', -1, '', '', 1);
		setcookie("password", '', -1, '', '', 1);
	}
}


if(!isset($password) || ($password == "") || isset($_GET["incorrectpassword"]))
{
?>
<html>
<link rel="stylesheet" type="text/css" href="loginform.css">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="mobile-web-app-capable" content="yes">
<meta http-equiv="cache-control" content="max-age=0" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
<meta http-equiv="pragma" content="no-cache" />
<title>Casaan</title>
</head>
 <form action="index.php" method="post">
  <div class="imgcontainer">
    <img src="img_avatar2.png" alt="Avatar" class="avatar">
  </div>

  <div class="container">
    <label for="username"><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name="username" required autocomplete="on"></input>

    <label for="password"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="password" required autocomplete="on"></input>

    <button type="submit">Login</button>
    <label>
      <input type="checkbox" name="remember"> Remember me</input>
    </label>
  </div>

</form> 
<?php
	exit();
}

*/
?>




<html>


<head>
<link rel="stylesheet" type="text/css" href="weather-icons/css/weather-icons.css">
<link rel="stylesheet" type="text/css" href="weather-icons/css/weather-icons-wind.css">
<link rel="stylesheet" type="text/css" href="css/casaan.css">


<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="mobile-web-app-capable" content="yes">
<meta http-equiv="cache-control" content="max-age=0" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
<meta http-equiv="pragma" content="no-cache" />
<title>Casaan</title>
</head>

<body scroll="no" style="overflow: hidden">

<div class="mainarea" width="100%" height="100%">
<div class="submainarea" id="mainpage">
<div class="floating-box" style="cursor: pointer; cursor: hand;" onclick="window.location='#time'">
<div class="boxtime" id="time"></div>
<div class="boxdate" id="date"></div>
</div><div id="weatherbox" class="floating-box" style="cursor: pointer; cursor: hand;" onclick="window.location='#weather'">
<div class="boxweathericon"></div>
<div class="boxtitle">Weer</div>
<div class="boxweathertemp weathertemptoday"></div>
<div class="boxweathertext weathertexttoday"></div>
</div><span class="portraitbr"></span><div id="domoticabox" class="floating-box" style="cursor: pointer; cursor: hand;" onclick="window.location='#domotica'">
<div class="boxtitle">Domotica</div>
<div class="boxdomoticaicon"><img src="icon/Bulb.png" width=60% height=60%></img></div>
</div><div id="climatecontrolbox"class="floating-box" style="cursor: pointer; cursor: hand;" onclick="window.location='#climatecontrol'">
<div class="boxtitle">Klimaatbeheersing</div>
<div class="boxlabelsmall">Huiskamer</div>
<div class="boxvalue"><span id="livingroomtemperaturenow">-</span> &deg;C</div>
<div class="boxlabelsmall boxlabel2smalldual">Pelletkachel<BR>Ingesteld</div>
<div class="boxvalue2"><span id="livingroomtemperatureset">-</span> &deg;C</div>
<div class="tempbuttons"><button class="tempbutton" onclick="settempup();">+</button><BR><button class="tempbutton" onclick="settempdown();">-</button></div>
<!--<div class="tempbuttons"><button class="tempbutton" onclick="setpelletstoveon();">Pellet<BR>kachel</button></div>-->
<canvas  id="temperaturebar" class="boxverticalbar"></canvas>
</div><br><div id="sunelectricitybox" class="floating-box" style="cursor: pointer; cursor: hand;" onclick="window.location='#sunelectricity'">
<div class="boxtitle">Zonnepanelen</div>
<canvas  id="sunelectricitybar" class="boxverticalbar"></canvas>
<div class="boxlabelsmall">Huidig</div>
<div class="boxvalue" id="sunelectricitycurrent"></div>
<div class="boxlabel2small">Vandaag</div>
<div class="boxvalue2" id="sunelectricitytoday"></div>
</div><div id="electricitybox" class="floating-box" style="cursor: pointer; cursor: hand;" onclick="window.location='#electricity'">
<div class="boxtitle">Electra</div>
<canvas class="boxverticalbar" id="electricitybar"></canvas>
<div class="boxlabelsmall">Huidig</div>
<div class="boxvalue" id="electricitycurrent"></div>
<div class="boxlabel2small">Vandaag</div>
<div class="boxvalue2" id="electricityusedtoday"></div>
</div><span class="portraitbr"></span><div id="gasbox" class="floating-box" style="cursor: pointer; cursor: hand;" onclick="window.location='#gas'">
<div class="boxtitle">Gas</div>
<canvas id="gasbar" class="boxverticalbar"></canvas>
<div class="boxlabelsmall">Afgelopen uur</div>
<div class="boxvalue" id="gascurrent"></div>
<div class="boxlabel2small">Vandaag</div>
<div class="boxvalue2" id="gastoday"></div>
</div><div id="waterbox" class="floating-box" style="cursor: pointer; cursor: hand;" onclick="window.location='#water'">
<div class="boxtitle">Water</div>
<canvas id="waterbar" class="boxverticalbar"></canvas>
<div class="boxlabelsmall">Huidig</div>
<div class="boxvalue" id="watercurrent"></div>
<div class="boxlabel2small">Vandaag</div>
<div class="boxvalue2" id="watertoday"></div>
</div>
</div>

<div class="submainarea" id="overviewpage" style="display:none">
<div class="floating-box" style="cursor: pointer; cursor: hand;"  onclick="showPage('graphdaypage')">
<div class="boxtitle"></div>
<canvas class="boxverticalbar" id="overviewpagebar0"></canvas>
<div class="boxlabelsmall"></div>
<div class="boxvalue"></div>
<div class="boxlabel2small"></div>
<div class="boxvalue2"></div>
</div><div class="floating-box" style="cursor: pointer; cursor: hand;" onclick="showPage('graphmonthpage')">
<div class="boxtitle"></div>
<canvas class="boxverticalbar" id="overviewpagebar1"></canvas>
<div class="boxlabelsmall"></div>
<div class="boxvalue"></div>
<div class="boxlabel2small"></div>
<div class="boxvalue2"></div>
</div><span class="portraitbr"></span><div class="floating-box" style="cursor: pointer; cursor: hand;" onclick="showPage('graphyearpage')">
<div class="boxtitle"></div>
<canvas class="boxverticalbar" id="overviewpagebar2"></canvas>
<div class="boxlabelsmall"></div>
<div class="boxvalue"></div>
<div class="boxlabel2small"></div>
<div class="boxvalue2"></div>
</div><div class="floating-box" style="cursor: pointer; cursor: hand;" onclick="showPage('graphtotalpage')">
<div class="boxtitle"></div>
<canvas class="boxverticalbar" id="overviewpagebar3"></canvas>
<div class="boxlabelsmall"></div>
<div class="boxvalue"></div>
<div class="boxlabel2small"></div>
<div class="boxvalue2"></div>
</div>
<br><div class="floating-box" style="cursor: pointer; cursor: hand;" onclick="showPage('graphpreviousdaypage')">
<div class="boxtitle"></div>
<canvas class="boxverticalbar" id="overviewpagebar4"></canvas>
<div class="boxlabelsmall"></div>
<div class="boxvalue"></div>
<div class="boxlabel2small"></div>
<div class="boxvalue2"></div>
<div class="ventbuttons" style="display:none;">
<button class="ventbutton" id="ventbuttonl" onclick="ventbuttonclick(0);">L</button>
<button class="ventbutton" id="ventbuttonm" onclick="ventbuttonclick(1);">M</button>
<button class="ventbutton" id="ventbuttonh" onclick="ventbuttonclick(2);">H</button>
</div></div><div class="floating-box" style="cursor: pointer; cursor: hand;" onclick="showPage('graphpreviousmonthpage')">
<div class="boxtitle"></div>
<canvas class="boxverticalbar" id="overviewpagebar5"></canvas>
<div class="boxlabelsmall"></div>
<div class="boxvalue"></div>
<div class="boxlabel2small"></div>
<div class="boxvalue2"></div>
</div><span class="portraitbr"></span><div class="floating-box" style="cursor: pointer; cursor: hand;" onclick="showPage('graphpreviousyearpage')">
<div class="boxtitle"></div>
<canvas class="boxverticalbar" id="overviewpagebar6"></canvas>
<div class="boxlabelsmall"></div>
<div class="boxvalue"></div>
<div class="boxlabel2small"></div>
<div class="boxvalue2"></div>
</div><div class="floating-box" style="cursor: pointer; cursor: hand;" onclick="showPage('graphpreviousyearpage')">
<canvas class="boxverticalbar" id="overviewpagebar7"></canvas>
<div class="boxlabelsmall"></div>
<div class="boxvalue"></div>
<div class="boxlabel2small"></div>
<div class="boxvalue2"></div>
<div class="boxtitle"></div>
<div class="boxtoptext"></div>
</div>
</div>

<div class="submainarea" id="domotica" style="display:none">
</div>

<div class="submainarea" id="weather" style="display:none"><div class="floating-box">
<div class="boxweathericon"><span class="wi wi-day-sunny"></span></div>
<div class="boxtitle">Nu</div>
<div class="boxweathertemp weathertemptoday"></div>
<div class="boxweathertext weathertexttoday"></div>
</div><div class="floating-box">
<div class="boxtitle">Wind</div>
<div class="boxweathericon"><span class=""></span></div>
<div class="boxweathertemp"><span id="windnow"></span></div>
</div><span class="portraitbr"></span><div class="wide-floating-box" style="cursor: pointer; cursor: hand;" onclick="showPage('weathertextpage')">
<div class="boxtitle">Weerbericht</div>
<div id="boxweathertext"><div id="weathertext"></div></div>
</div><br><div class="floating-box">
<div class="boxtitle nametoday+1">Morgen</div>
<div class="boxweathericon"><span class="wi wi-day-sunny"></span></div>
<div class="boxweathertemp"><span id="temptomorrow"></span><br><span id="weathertomorrow"></span></div>
</div><div class="floating-box">
<div class="boxtitle nametoday+2">Overmorgen</div>
<div class="boxweathericon"><span class="wi wi-day-sunny"></span></div>
<div class="boxweathertemp"><span id="tempaftertomorrow"></span><br><span id="weatheraftertomorrow"></span></div>
</div><span class="portraitbr"></span><div class="floating-box">
<div class="boxtitle nametoday+3">Dag na overmorgen</div>
<div class="boxweathericon"><span class="wi wi-day-sunny"></span></div>
<div class="boxweathertemp"><span id="tempafteraftertomorrow"></span><br><span id="weatherafteraftertomorrow"></span></div>
</div><div class="floating-box">
<div class="boxtitle nametoday+4">Dag na de dag van overmorgen</div>
<div class="boxweathericon"><span class="wi wi-day-sunny"></span></div>
<div class="boxweathertemp"><span id="tempafterafteraftertomorrow"></span><br><span id="weatherafterafteraftertomorrow"></span></div>
</div>
</div>

<div class="submainarea" id="weathertextpage" style="display:none">
<div class="fullscreen-floating-box"><div class="fullboxtext"><span id="weathertextlong"></span></div>
</div>
</div>


<div class="submainarea" id="timepage" style="display:none"><div class="floating-box">
<div class="boxtitle">Lokaal</div>
<div class="boxtime" id="timenl"></div>
<div class="boxdate" id="datenl"></div>
</div><div class="floating-box">
<div class="boxtitle">Londen</div>
<div class="boxtime" id=timeen></div>
<div class="boxdate" id="dateen"></div>
</div><div class="floating-box">
<div class="boxtitle">New York</div>
<div class="boxtime" id=timeny></div>
<div class="boxdate" id="dateny"></div>
</div><div class="floating-box">
<div class="boxtitle">Changhai</div>
<div class="boxtime" id=timech></div>
<div class="boxdate" id="datech"></div>
</div><br><div class="floating-box">
<div class="boxtitle">Zon</div>
<div class="boxweathericon"><span class="wi wi-day-sunny"></span></div>
<div class="boxlowertext"><span id="sun">Op: -<BR>Onder: -</span></div>
</div><div class="floating-box">
<div class="boxtitle">Maan</div>
<div class="boxweathericon"><span class="wi wi-moon-waxing-crescent-2"></span></div>
<div class="boxlowertext"><span id="moon">Op: -<BR>Onder: -</span></div>
</div><div class="floating-box">
</div><div class="floating-box" onclick="location.href='index.html';">
<div class="boxcenterbig"></div>
</div></div>


<div class="submainarea" id="graphpage" style="display:none"><div class="fullscreen-floating-box">
<div style="width:100%; height:100%" id="graph"></div></div>
</div>


</div>
<ul class="tab footer">
		<li class="footerbutton" onclick='scene("evening");'>Avond</a></li>
		<li class="footerbutton" onclick='scene("diner");'>Eten</a></li>
		<li class="footerbutton"  id="footersceneoffbutton" onclick='scene("off");'>Uit</a></li>
		<li class="footerbutton" onclick='scene("movie");'>Film</a></li>
		<li class="footerbutton" onclick='scene("bright");'>Fel</a></li>

	<div class="footersection">
		<li class="menuitem" id="graphbuttons" style="display:none">
			<a href="javascript:void(0)" onclick="showPage('graphdaypage')">Dag</a>
			<a href="javascript:void(0)" onclick="showPage('graphmonthpage')">Maand</a>
			<a href="javascript:void(0)" onclick="showPage('graphyearpage')">Jaar</a>
			<a href="javascript:void(0)" onclick="showPage('graphtotalpage')">Totaal</a>
		</li>
	</div>
	<div class="footersection">
		<li class="label" id="casaanlabel" onclick="window.location='#'">Casaan</li></div>
	<div class="footersection">
		<li class="backbutton" style="display:none" onclick="window.history.back();">Terug</li>
	</div>
</ul>
</body>

<script src="js/moment.js"></script>
<script src="js/textFit.js"></script>
<script src="js/moment-with-locales.min.js"></script>
<script src="js/moment-timezone-with-data.min.js"></script>
<script src="js/jquery.min.js"></script>
<script src="js/jquery.tempgauge.js"></script>
<script src="rgraph/libraries/RGraph.common.core.js"></script>
<script src="rgraph/libraries/RGraph.vprogress.js"></script>
<script src="suncalc/suncalc.js"></script>

<script src="js/highcharts.js"></script>
<script src="js/highcharts_exporting.js"></script>

<script src="js/lodash.js"></script>
<script src="js/mqttws31.js"></script>
<script src="js/mqttuserpass.js"></script>

<script type="text/javascript">
//    window.mqttusername = '<?=$username?>'; // That's for a string
//    window.mqttpassword = '<?=$password?>'; // That's for a string
</script>

<script src="js/casaan.js?filemtime=<?php echo filemtime('js/casaan.js'); ?>"></script>

<script>
var vprogress;
	
window.onresize = autochangesizes;

$( document ).ready(function() {
	startcasaan();
	showPage(window.location.hash.substr(1));
});
</script>


</html>

