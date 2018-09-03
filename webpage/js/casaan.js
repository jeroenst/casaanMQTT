// The object casaandata is filled with data from the casaan server
var casaandata = {};
var currentpage = ""; 
var mqttdata = {};
                buttononcolor = "#66ff66";
                buttonsceneoncolor = "#00ccff";
                buttonoffcolor = "";
//
//	Autochangesizes calculates the size of fonts and elements
//  for best fit on screen. Also changes from portrait to
//  landscape mode based on screen aspect ratio
//
function autochangesizes()
{
	var element;
	var elements;
	var i;

	var clientHeight = window.innerHeight;//document.getElementsByClassName("mainarea")[0].clientHeight;
	var clientWidth = window.innerWidth; //document.getElementsByClassName("mainarea")[0].clientWidth;
	var floatingboxWidthHeight = 0;
	
	if (clientHeight > clientWidth)
	{
		// Portrait Mode
		elements = document.getElementsByClassName("portraitbr");
		for(i=0; i<elements.length; i++)
		{
			elements[i].innerHTML = "<BR>"
		}
		floatingboxWidthHeight = clientHeight / 4.6;
		if (floatingboxWidthHeight * 2.3 > clientWidth) floatingboxWidthHeight = clientWidth / 2.3;		
	}
	else
	{
		// Landscape Mode
		elements = document.getElementsByClassName("portraitbr");
		for (i = 0; i < elements.length; i++) 
		{
			elements[i].innerHTML = "";
		}
		floatingboxWidthHeight = clientWidth / 4.3;
		if (floatingboxWidthHeight * 2.3 > clientHeight) floatingboxWidthHeight = clientHeight / 2.3;
	}

	var elements = document.querySelectorAll('.floating-box');
	for(var i=0; i<elements.length; i++)
	{
		elements[i].style.height = floatingboxWidthHeight + "px";
		elements[i].style.width = floatingboxWidthHeight + "px";
	}


	var elements = document.querySelectorAll(".wide-floating-box");
        for(var i=0; i<elements.length; i++)
        {
                elements[i].style.height = floatingboxWidthHeight + "px";
                elements[i].style.width = (floatingboxWidthHeight*2.01) + "px";
        }

	// Auto size footer bar items
	var clientHeight = document.getElementsByClassName('tab')[0].clientHeight;
	elements = document.querySelectorAll('.label, .backbutton, .menuitem');
	for(var i=0; i<elements.length; i++)
	{
		elements[i].style.fontSize = (floatingboxWidthHeight  / 10) + "px";
	}

	//	var clientWidth = 1;
	
	//	elements = document.getElementsByClassName("fullscreen-floating-box");
	//	for(i=0; i<elements.length; i++)
	//	{
	//		clientHeight = elements[i].clientHeight;
	//		clientWidth = elements[i].clientWidth;
	//		if (clientWidth > 0) break;
	//	}

	


/*	var elements = document.querySelectorAll('.fullscreen-boxtext');
	for(var i=0; i<elements.length; i++)
	{
		if (clientHeight > clientWidth) elements[i].style.fontSize = floatingboxWidthHeight  / 45 + "px"
		else elements[i].style.fontSize = (clientHeight + (clientWidth * 0.5))  / 35 + "px";
		elements[i].style.fontSize = floatingboxWidthHeight  / 45 + "px";
	}
*/
	elements = document.querySelectorAll('.boxtitle, .boxlabelsmall, .boxlabel2small, .weathertext');
	for(i=0; i<elements.length; i++)
	{
		elements[i].style.fontSize = (floatingboxWidthHeight / 17) + "px";
	}

	elements = document.querySelectorAll('.boxtoptext');
	for(i=0; i<elements.length; i++)
	{
		elements[i].style.fontSize = (floatingboxWidthHeight / 16) + "px";
	}

	elements = document.querySelectorAll('.wideboxtext');
	for(i=0; i<elements.length; i++)
	{
		elements[i].style.fontSize =(floatingboxWidthHeight / 9) + "px";
	}

	elements = document.querySelectorAll('.boxdate, .boxvalue, .boxvalue2, .boxweathertemp, .boxlowertext');
	for(i=0; i<elements.length; i++)
	{
		elements[i].style.fontSize =(floatingboxWidthHeight / 10) + "px";
	}

	elements = document.querySelectorAll('.boxtime');
	for(i=0; i<elements.length; i++)
	{
		elements[i].style.fontSize = (floatingboxWidthHeight / 5) + "px";
	}


	elements = document.getElementsByClassName('boxweathericon');
	for(i=0; i<elements.length; i++)
	{
		document.getElementsByClassName('boxweathericon')[i].style.fontSize =
		(floatingboxWidthHeight / 3.5) + "px";
	}

	elements = document.getElementsByClassName('domoticabutton');
	for(i=0; i<elements.length; i++)
	{
		document.getElementsByClassName('domoticabutton')[i].style.width = floatingboxWidthHeight /3 + "px";
		document.getElementsByClassName('domoticabutton')[i].style.height = floatingboxWidthHeight /3 + "px";
		document.getElementsByClassName('domoticabutton')[i].style.fontSize = floatingboxWidthHeight /15 + "px";
	}

	elements = document.getElementsByClassName('tempbutton');
	for(i=0; i<elements.length; i++)
	{
		elements[i].style.width = floatingboxWidthHeight /4 + "px";
		elements[i].style.height = floatingboxWidthHeight /4 + "px";
		elements[i].style.fontSize = floatingboxWidthHeight /10 + "px";
	}

	elements = document.getElementsByClassName('ventbutton');
	for(i=0; i<elements.length; i++)
	{
		elements[i].style.width = floatingboxWidthHeight /5 + "px";
		elements[i].style.height = floatingboxWidthHeight /5 + "px";
		elements[i].style.fontSize = floatingboxWidthHeight /10 + "px";
	}

	elements = document.getElementsByClassName('domoticabuttons');
	for(i=0; i<elements.length; i++)
	{
		document.getElementsByClassName('domoticabuttons')[i].style.marginTop = floatingboxWidthHeight / 9 + "px";
	}

	elements = document.getElementsByClassName('domoticainfo');
	for(i=0; i<elements.length; i++)
	{
		document.getElementsByClassName('domoticainfo')[i].style.marginTop = floatingboxWidthHeight / 15 + "px";
		document.getElementsByClassName('domoticainfo')[i].style.fontSize = floatingboxWidthHeight /15 + "px";
	}




	var canvas = document.getElementById('insidetemperaturegauge');

	if (canvas == null)
	{
		try
		{
			ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		}
		catch (err)
		{
		}
	}

	$('#insidetemperaturegauge').tempGauge({
width: floatingboxWidthHeight *0.4,
borderWidth:2,
showLabel:false,
showScale:false,
borderColor: "#EEEEEE",
maxTemp: 25,
minTemp: 15,
	});


	clientHeight =  document.getElementsByClassName("fullboxtext")[0].clientHeight;
	clientWidth =  document.getElementsByClassName("fullboxtext")[0].clientWidth;
	element = document.getElementById("weathertextlong");
	if (clientHeight > 0)
	{
		element.style.fontSize = "60px";
		for (var i = 60; (element.offsetHeight > clientHeight) && (i > 1); i--)
		{
			document.getElementById("weathertextlong").style.fontSize = i + "px";
		}
	}

	element = document.getElementById("weathertext");
	if (clientHeight > 0)
	{
		element.style.fontSize = "60px";
		for (var i = 60; (element.offsetHeight > clientHeight) && (i > 1); i--)
		{
			document.getElementById("weathertext").style.fontSize = i + "px";
		}
	}
}

//
// The function createBars creates the vertical gauge bars on all pages
//
var waterbar;
var gasbar;
var electricitybar;
var sunelectricitybar;
var temperaturebar;
var overviewpagebar = [];

function createBars()
{
	waterbar = new RGraph.VProgress(
	{
id: 'waterbar',
min: 0,
max: 20,
value: 0,
options: {
textAccessible: true,
tickmarks: false,
shadow: false,
colors: ['Gradient(#699:#5ff:#5ff)'],
gutterTop: 0,
gutterBottom: 0,
gutterLeft: 0,
gutterRight: 0
			
		}
	}).draw();

	temperaturebar = new RGraph.VProgress(
	{
id: 'temperaturebar',
min: 16,
max: 22,
value: 0,
options: {
textAccessible: true,
tickmarks: false,
shadow: false,
colors: ['Gradient(#966:#f55:#f55)'],
gutterTop: 0,
gutterBottom: 0,
gutterLeft: 0,
gutterRight: 0
			
		}
	}).draw();
	
	gasbar = new RGraph.VProgress(
	{
id: 'gasbar',
min: 0,
max: 3,
value: 0,
options: {
textAccessible: true,
tickmarks: false,
shadow: false,
colors: ['Gradient(#996:#ff5:#ff5)'],
gutterTop: 0,
gutterBottom: 0,
gutterLeft: 0,
gutterRight: 0
			
		}
	}).draw();
	
	electricitybar = new RGraph.VProgress(
	{
id: 'electricitybar',
min: 0,
max: 9000,
value: 0,
options: {
textAccessible: true,
tickmarks: false,
shadow: false,
colors: ['Gradient(#555:#555:#555)'],
gutterTop: 0,
gutterBottom: 0,
gutterLeft: 0,
gutterRight: 0
			
		}
	}).draw();
	
	sunelectricitybar = new RGraph.VProgress(
	{
id: 'sunelectricitybar',
min: 0,
max: 2700,
value: 0,
options: {
textAccessible: true,
tickmarks: false,
shadow: false,
colors: ['Gradient(#696:#7d7:#7d7)'],
gutterTop: 0,
gutterBottom: 0,
gutterLeft: 0,
gutterRight: 0
			
		}
	}).draw();

	for (i=0; i < 8; i++)
	{
		overviewpagebar[i] = new RGraph.VProgress(
		{
id: 'overviewpagebar'+i,
min: 0,
max: 10,
value: 0,
options: {
textAccessible: true,
tickmarks: false,
shadow: false,
colors: ['Gradient(#699:#5ff:#5ff)'],
gutterTop: 0,
gutterBottom: 0,
gutterLeft: 0,
gutterRight: 0
				
			}
		}).draw();
	}
}

//
// Startcasaan() initializes the webpage and creates connection to the casaanserver
//
function startcasaan()
{
	//document.documentElement.requestFullscreen();
	//document.body.requestFullscreen();
//	startcasaanwebsocket();
	setInterval(updateTime, 1000);
	setInterval(connectMQTT, 5000);
	updateTime();
	autochangesizes();
	starttimepage();
	createBars();
	createDomoticaPage();
	document.onHistoryGo = showPage("previouspage");
	window.addEventListener("hashchange", hashchanged, false);
}

function hashchanged()
{
	showPage(window.location.hash.substring(1));
}

function toggletuinrelay(relayid)
{
	topic="home/ESP_TUIN/setrelay/"+relayid;

	newvalue=mqttdata["home/ESP_TUIN/relay/"+relayid] == "0" ? "1" : "0"; 

	console.log("MQTT-Sending:"+topic+"="+newvalue); 
	client.send (topic, newvalue, 0, true);
	
	if ((relayid == 0) && (newvalue == "1")) // When selecting continue pump disable waterfall
	{
		topic="home/ESP_TUIN/setrelay/1";
		value="0"; 
		console.log("MQTT-Sending:"+topic+"="+value); 
		client.send (topic, value, 0, true);
	}
	if ((relayid == 1) && (newvalue == "1"))// When slecting waterfall disable continue pump and uv
	{
		var topic="home/ESP_TUIN/setrelay/0";
		var value="0"; 
		console.log("MQTT-Sending:"+topic+"="+value); 
		client.send (topic, value, 0, true);
		topic="home/ESP_TUIN/setrelay/2";
		value="0"; 
		console.log("MQTT-Sending:"+topic+"="+value); 
		client.send (topic, value, 0, true);
	}
	
	if ((relayid == 1) && (newvalue == "0")) // When waterfall is set to off enable continue pump
	{
		topic="home/ESP_TUIN/setrelay/0";
		value="1"; 
		console.log("MQTT-Sending:"+topic+"="+value); 
		client.send (topic, value, 0, true);
	}
}


function togglesproeierrelay(relayid)
{
	topic="home/ESP_IRRIGATION/setrelay/"+relayid;
	newvalue=mqttdata["home/ESP_IRRIGATION/relay/"+relayid] == "0" ? "1" : "0"; 

	console.log("MQTT-Sending:"+topic+"="+newvalue); 
	client.send (topic, newvalue, 0, false);
}

function createDomoticaPage()
{

	var domoticapagestring;
	domoticapagestring += '<div class="floating-box"><div class="boxtitle">Huiskamer</div><div class="domoticabuttons"><div><button class="domoticabutton" id="buttonzwave3off" onclick="zwavetoggle(4)">Tv</button><button class="domoticabutton" id="buttonzwave3off" onclick="zwavetoggle(3)">Dressoir</button><BR><button class="domoticabutton" id="buttonzwave3off" onclick="zwavecolordim(11)">Stalamp</button><button class="domoticabutton" id="buttonzwave3off" onclick="zwavedim(10)">Spots</button></div></div><div class="domoticainfo">-</div></div>';
	domoticapagestring += '<div class="floating-box"><div class="boxtitle">Keuken</div><div class="domoticabuttons"><div><button class="domoticabutton" id="buttonzwave3off" onclick="zwavedim(9)">Eettafel</button><button class="domoticabutton" id="buttonzwave3off" onclick="zwavedim(2)">Spots</button><BR><button class="domoticabutton" id="buttonzwave3off" onclick="zwavedim(0)">-</button><button class="domoticabutton" id="buttonzwave3off" onclick="zwavedim(0)">-</button></div></div><div class="domoticainfo">-</div></div>';
	domoticapagestring += '<span class="portraitbr"></span><div class="floating-box"><div class="boxtitle">Tuin</div><div class="domoticabuttons"><div><button class="domoticabutton" id="sonoff1_0" onclick="toggletuinrelay(0);">Pomp1</button><button class="domoticabutton" id="sonoff1_1" onclick="toggletuinrelay(1);">Pomp2</button><br><button class="domoticabutton" id="sonoff1_2" onclick="toggletuinrelay(2);">UV</button><button class="domoticabutton" id="sonoff1_3" onclick="toggletuinrelay(3);">Lamp</button></div></div><div class="domoticainfo"></div></div>';
	domoticapagestring += '<div class="floating-box"><div class="boxtitle">Sproeiers</div><div class="domoticabuttons"><div><button class="domoticabutton" id="sonoff2_0" onclick="togglesproeierrelay(0);">Voortuin</button><button class="domoticabutton" id="sonoff2_1" onclick="togglesproeierrelay(1);">Achtertuin<br>Achter</button><br><button class="domoticabutton" id="sonoff2_2" onclick="togglesproeierrelay(2);">Achtertuin<BR>voor</button><button class="domoticabutton" id="sonoff2_3" onclick="togglesproeierrelay(3);">-</button></div></div><div class="domoticainfo"></div></div>';
	domoticapagestring += '<BR><div class="floating-box"><div class="boxtitle">Stalamp Huiskamer</div><div class="domoticabuttons"><div><button class="domoticabutton" id="buttonzwave6off" onclick="sendzwave(11,\'colorswitch\',1,0,\'#FF00000000\');">Rood</button><button class="domoticabutton" id="buttonzwave6ww" onclick="sendzwave(11,\'colorswitch\',1,0,\'#00FF000000\');">Groen</button><br><button class="domoticabutton" id="buttonzwave6ww" onclick="sendzwave(11,\'colorswitch\',1,0,\'#0000FF0000\');">Blauw</button><button class="domoticabutton" id="buttonzwave6ww" onclick="sendzwave(11,\'colorswitch\',1,0,\'#5522FF0000\');">Paars</button></div></div><div class="domoticainfo"></div></div>';
	domoticapagestring += '<div class="floating-box"><div class="boxtitle">Scenes</div><div class="domoticabuttons"><div><button class="domoticabutton" id="buttonzwavescene1" onclick="zwavescene(\'avond\');">Avond</button><button class="domoticabutton" id="buttonzwavescene2" onclick="zwavescene(\'film\');">Film</button><br><button class="domoticabutton" id="buttonzwavescene3"" onclick="zwavescene(\'fel\');">Fel</button><button class="domoticabutton" id="buttonzwavescene4" onclick="zwavescene(\'uit\');">Uit</button></div></div><div class="domoticainfo"></div></div>';
	document.getElementById("domotica").innerHTML = domoticapagestring;
}

function zwavetoggle(id)
{
	console.log (id + "=" + mqttdata["home/zwave/"+id+"/switchbinary/1/switch"]);
	if (mqttdata["home/zwave/"+id+"/switchbinary/1/switch"] == "false") sendzwave(id,"switchbinary",1,0,1); 
	else sendzwave(id,"switchbinary",1,0,0); 
}

function zwavedim(id)
{
	console.log (id + "=" + mqttdata["home/zwave/"+id+"/switchmultilevel/1/level"]);
	if (mqttdata["home/zwave/"+id+"/switchmultilevel/1/level"] < 10) sendzwave(id,"switchmultilevel",1,0,10); 
	else if (mqttdata["home/zwave/"+id+"/switchmultilevel/1/level"] < 50) sendzwave(id,"switchmultilevel",1,0,50); 
	else if (mqttdata["home/zwave/"+id+"/switchmultilevel/1/level"] < 99) sendzwave(id,"switchmultilevel",1,0,99);
	else sendzwave(id,"switchmultilevel",1,0,0);
}

function zwavecolordim(id)
{
	console.log (id + "=" + mqttdata["home/zwave/"+id+"/switchmultilevel/1/level"]);
	if (mqttdata["home/zwave/"+id+"/switchmultilevel/1/level"] < 10)
	{
		sendzwave(id,"switchmultilevel",1,0,10); 
		sendzwave(11,"colorswitch",1,0,"#FF88180000");
	}
	else if (mqttdata["home/zwave/"+id+"/switchmultilevel/1/level"] < 50)
	{
		sendzwave(id,"switchmultilevel",1,0,50); 
		sendzwave(11,"colorswitch",1,0,"#FF88200000");
	}
	else if (mqttdata["home/zwave/"+id+"/switchmultilevel/1/level"] < 99)
	{
		sendzwave(id,"switchmultilevel",1,0,99);
		sendzwave(11,"colorswitch",1,0,"#FF90300000");
	}
	else sendzwave(id,"switchmultilevel",1,0,0);
}

function zwavescene(sceneid)
{
	switch (sceneid)
	{
		case "avond":
			sendzwave(2,"switchmultilevel",1,0,20); 
			sendzwave(3,"switchbinary",1,0,1); 
			sendzwave(4,"switchbinary",1,0,1); 
			sendzwave(9,"switchmultilevel",1,0,0);
			sendzwave(10,"switchmultilevel",1,0,20);
			sendzwave(11,"switchmultilevel",1,0,50); 
			sendzwave(11,"colorswitch",1,0,"#FF88200000");
		break;
		case "film":
			sendzwave(2,"switchmultilevel",1,0,1);
			sendzwave(3,"switchbinary",1,0,0); 
			sendzwave(4,"switchbinary",1,0,1); 
			sendzwave(9,"switchmultilevel",1,0,0); 
			sendzwave(10,"switchmultilevel",1,0,1); 
			sendzwave(11,"colorswitch",1,0,"#FF88180000");
			sendzwave(11,"switchmultilevel",1,0,1);
		break
		case "fel":
			sendzwave(2,"switchmultilevel",1,0,99);
			sendzwave(3,"switchbinary",1,0,1); 
			sendzwave(4,"switchbinary",1,0,1); 
			sendzwave(9,"switchmultilevel",1,0,99); 
			sendzwave(10,"switchmultilevel",1,0,99);
			sendzwave(11,"colorswitch",1,0,"#FF90300000");
			sendzwave(11,"switchmultilevel",1,0,99); 
		break;
		case "uit":
			sendzwave(2,"switchmultilevel",1,0,0); 
			sendzwave(3,"switchbinary",1,0,0); 
			sendzwave(4,"switchbinary",1,0,0); 
			sendzwave(9,"switchmultilevel",1,0,0); 
			sendzwave(10,"switchmultilevel",1,0,0); 
			sendzwave(11,"colorswitch",1,0,"#FF88180000");
			sendzwave(11,"switchmultilevel",1,0,0); 
		break;
	}
}


// Create a client instance
client = new Paho.MQTT.Client("wss://" + window.location.hostname + "/wsmqtt", "browser_" + Math.random().toString(36).substr(2, 9));

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
connectMQTT();

// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("MQTT Connected");
  client.subscribe("home/ESP_WATERMETER/#");
  client.subscribe("home/ESP_SMARTMETER/#");
  client.subscribe("home/ESP_WATERMETER/#");
  client.subscribe("home/casaan/#");
//  client.subscribe("home/smartmeter/gas/#");
  client.subscribe("home/growatt/#");
//  client.subscribe("home/growatt/pv/#");
  client.subscribe("home/ESP_OPENTHERM/#");
  client.subscribe("home/ESP_DUCOBOX/#");
  client.subscribe("home/buienradar/actueel_weer/weerstations/weerstation/6370/#");

  client.subscribe("home/buienradar/verwachting_vandaag/samenvatting");
  client.subscribe("home/buienradar/verwachting_vandaag/tekst");
  client.subscribe("home/buienradar/verwachting_meerdaags/+/mintemp");
  client.subscribe("home/buienradar/verwachting_meerdaags/+/maxtemp");
  client.subscribe("home/zwave/status");
  client.subscribe("home/zwave/+/switchmultilevel/+/level");
  client.subscribe("home/zwave/+/sensormultilevel/+/power");
  client.subscribe("home/zwave/+/switchbinary/+/switch");
  client.subscribe("home/zwave/+/meter/+/power");
  client.subscribe("home/zwave/+/colorswitch/#");
  client.subscribe("home/temper2/#");
  client.subscribe("home/sanitasSBF70/#");
  client.subscribe("home/esp8266/#");
  client.subscribe("home/ESP_SLAAPKAMER2/#");
  client.subscribe("home/ESP_BADKAMER/#");
  client.subscribe("home/zwave/+/meter/1/voltage");
  client.subscribe("home/ESP_TUIN/#");
  client.subscribe("home/ESP_IRRIGATION/#");
  
  
//  message = new Paho.MQTT.Message("Hello");
//  message.destinationName = "World";
//  client.send(message);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("MQTT Connection lost, reason: "+responseObject.errorMessage);
    mqttdata = {};
    onMessageArrived({payloadString: "disconnected", destinationName: "mqtt"});
  }
}

function connectMQTT()
{
   try
   {
   	if (!client.isConnected()) client.connect({onSuccess:onConnect, userName: mqttusername, password: mqttpassword});
   }
   catch (err)
   {

   }
}

// called when a message arrives
function onMessageArrived(message) {
  var value = message.payloadString;
  console.log("MQTT-Received:"+message.destinationName+"="+message.payloadString);
  mqttdata[message.destinationName] = message.payloadString;
  document.getElementById('electricitybox').getElementsByClassName('boxtitle')[0].innerHTML =   
    "<font color=\""+(((dv(mqttdata["home/ESP_SMARTMETER/status"]) == "offline" || dv(mqttdata["home/ESP_SMARTMETER/status"]) == "-")) ? "#ff0000" : "#00bb00")+"\">Netstroom</font>";
  document.getElementById('gasbox').getElementsByClassName('boxtitle')[0].innerHTML =   
    "<font color=\""+(((dv(mqttdata["home/ESP_SMARTMETER/status"]) == "offline" || dv(mqttdata["home/ESP_SMARTMETER/status"]) == "-")) ? "#ff0000" : "#00bb00")+"\">Gas</font>";
  document.getElementById('waterbox').getElementsByClassName('boxtitle')[0].innerHTML =   
    "<font color=\""+(((dv(mqttdata["home/ESP_WATERMETERC/status"]) == "offline") || (dv(mqttdata["home/ESP_WATERMETER/status"]) == "-")) ? "ff0000" : "#00bb00")+"\">Water</font>";
  document.getElementById('sunelectricitybox').getElementsByClassName('boxtitle')[0].innerHTML =   
    "<font color=\""+(((dv(mqttdata["home/growatt/status"]) == "offline" || dv(mqttdata["home/growatt/status"]) == "-")) ? "#ff0000" : "#00bb00")+"\">Zonnestroom</font>";
  document.getElementById('domoticabox').getElementsByClassName('boxtitle')[0].innerHTML =   
    "<font color=\""+(((dv(mqttdata["home/zwave/status"]) == "offline" || dv(mqttdata["home/zwave/status"]) == "-")) ? "#ff0000" : "#00bb00")+"\">Domotica</font>";
 
  switch (message.destinationName)
  {
  	case "home/ESP_SMARTMETER/electricity/kw_providing":
  	case "home/ESP_SMARTMETER/electricity/kw_using":
  			value = dv(Math.round((mqttdata["home/ESP_SMARTMETER/electricity/kw_using"]-mqttdata["home/ESP_SMARTMETER/electricity/kw_providing"])*1000));
	 		document.getElementById('electricitycurrent').innerHTML = value + " watt";
	 		if (value >= 0) electricitybar.value = parseInt(value);
	 		else electricitybar.value = 0;
	 		electricitybar.grow();
	break;
	
	case "home/ESP_SMARTMETER/electricity/kwh_used1":
	case "home/ESP_SMARTMETER/electricity/kwh_used2":
		mqttdata["home/ESP_SMARTMETER/electricity/kwh_used"]=(parseFloat(mqttdata["home/ESP_SMARTMETER/electricity/kwh_used1"]) + parseFloat(mqttdata["home/ESP_SMARTMETER/electricity/kwh_used2"])).toFixed(3);
	break;
	case "home/ESP_SMARTMETER/electricity/kwh_provided1":
	case "home/ESP_SMARTMETER/electricity/kwh_provided2":
		mqttdata["home/ESP_SMARTMETER/electricity/kwh_provided"]=(parseFloat(mqttdata["home/ESP_SMARTMETER/electricity/kwh_provided1"]) + parseFloat(mqttdata["home/ESP_SMARTMETER/electricity/kwh_provided2"])).toFixed(3);
	break;
	
	case "home/casaan/electricitymeter/today/kwh":
		document.getElementById('electricityusedtoday').innerHTML = dv(value) + " kwh";
	break;
	case "home/casaan/gasmeter/today/m3":
		document.getElementById('gastoday').innerHTML = dv(value) + " m3";
	break;

	case "home/casaan/gasmeter/m3h":
		document.getElementById('gascurrent').innerHTML = dv(value) + " m3";
	break;


  	case "home/growatt/grid/watt":
                document.getElementById('sunelectricitycurrent').innerHTML = dv(value) + " watt";
                sunelectricitybar.value = parseInt(value);
                sunelectricitybar.grow();
	break;
	
	
	case "home/growatt/grid/today/kwh":
		document.getElementById('sunelectricitytoday').innerHTML = dv(value) + " kwh";
	break;
	case "home/ESP_OPENTHERM/thermostat/temperature":
                document.getElementById('livingroomtemperaturenow').innerHTML = dv(parseFloat(value).toFixed(1));
                temperaturebar.value = parseFloat(value).toFixed(1);
                temperaturebar.grow();
	break;
	case "home/ESP_OPENTHERM/thermostat/setpoint":
		document.getElementById('livingroomtemperatureset').innerHTML = dv(parseFloat(value).toFixed(1));
	break;
	case "home/buienradar/actueel_weer/weerstations/weerstation/6370/temperatuurGC":
		elements = document.getElementsByClassName('weathertemptoday');
		for(var y=0; y<elements.length; y++)
		{
			elements[y].innerHTML = dv(value) + " &deg;C";
		}
	break;
	
	case "home/buienradar/actueel_weer/weerstations/weerstation/6370/windsnelheidBF":
		document.getElementById("windnow").innerHTML = dv(value) + " Bft<BR>" + dv(mqttdata["home/buienradar/actueel_weer/weerstations/weerstation/6370/windsnelheidBF"]); 
	break;
	
	case "home/buienradar/actueel_weer/weerstations/weerstation/6370/windrichting":
		document.getElementById("windnow").innerHTML = dv(mqttdata["home/buienradar/actueel_weer/weerstations/weerstation/6370/windsnelheidBF"])+ " Bft<BR>" + dv(value);
	break;

	case "home/buienradar/verwachting_vandaag/samenvatting":
                elements = document.getElementsByClassName('weathertext');
                for(var y=0; y<elements.length; y++)
                {
                     elements[y].innerHTML = dv(value);
                }
	break;		

	case "home/buienradar/verwachting_vandaag/tekst":
		document.getElementById("weathertextlong").innerHTML = dv(value);
	break;		

	case "home/buienradar/verwachting_meerdaags/dag-plus1/mintemp":
	case "home/buienradar/verwachting_meerdaags/dag-plus1/maxtemp":
		document.getElementById("temptomorrow").innerHTML = dv(mqttdata["home/buienradar/verwachting_meerdaags/dag-plus1/maxtemp"]) + " / " + dv(mqttdata["home/buienradar/verwachting_meerdaags/dag-plus1/mintemp"]);
	break;		

	case "home/buienradar/verwachting_meerdaags/dag-plus2/mintemp":
	case "home/buienradar/verwachting_meerdaags/dag-plus2/maxtemp":
		document.getElementById("tempaftertomorrow").innerHTML = dv(mqttdata["home/buienradar/verwachting_meerdaags/dag-plus2/maxtemp"]) + " / " + dv(mqttdata["home/buienradar/verwachting_meerdaags/dag-plus2/mintemp"]);
	break;		

	case "home/buienradar/verwachting_meerdaags/dag-plus3/mintemp":
	case "home/buienradar/verwachting_meerdaags/dag-plus3/maxtemp":
		document.getElementById("tempafteraftertomorrow").innerHTML = dv(mqttdata["home/buienradar/verwachting_meerdaags/dag-plus3/maxtemp"]) + " / " + dv(mqttdata["home/buienradar/verwachting_meerdaags/dag-plus3/mintemp"]);
	break;		

	case "home/buienradar/verwachting_meerdaags/dag-plus4/mintemp":
	case "home/buienradar/verwachting_meerdaags/dag-plus4/maxtemp":
		document.getElementById("tempafterafteraftertomorrow").innerHTML = dv(mqttdata["home/buienradar/verwachting_meerdaags/dag-plus4/maxtemp"]) + " / " + dv(mqttdata["home/buienradar/verwachting_meerdaags/dag-plus4/mintemp"]);
	break;		

	
	

	case "home/ESP_WATERMETER/water/lmin":
                document.getElementById('watercurrent').innerHTML = dv(value) + " l/min";
                waterbar.value = value;
                waterbar.grow();
	break;
	case "home/casaan/watermeter/today/m3":
                document.getElementById('watertoday').innerHTML = dv(value) + " m3";
	break;


	case "home/zwave/2/switchmultilevel/1/level":
                buttononcolor = "#66ff66";
                buttonsceneoncolor = "#00ccff";
                buttonoffcolor = "";
		document.getElementsByClassName('domoticabutton')[5].style.backgroundColor = value > 0 ? buttononcolor : buttonoffcolor;
	case "home/zwave/2/sensormultilevel/1/power":
		document.getElementsByClassName('domoticabutton')[5].innerHTML = "Spots<BR>" + dv(mqttdata["home/zwave/2/switchmultilevel/1/level"]) + "%";// - " + dv(mqttdata["home/zwave/2/sensormultilevel/1/power"]) + " watt";
	break;

	case "home/zwave/9/switchmultilevel/1/level":
                buttononcolor = "#66ff66";
                buttonsceneoncolor = "#00ccff";
                buttonoffcolor = "";
		document.getElementsByClassName('domoticabutton')[4].style.backgroundColor = value > 0 ? buttononcolor : buttonoffcolor;
	case "home/zwave/9/sensormultilevel/1/power":
		document.getElementsByClassName('domoticabutton')[4].innerHTML = "Eettafel<BR>" + dv(mqttdata["home/zwave/9/switchmultilevel/1/level"]) + "%";//+" - " + dv(mqttdata["home/zwave/9/sensormultilevel/1/power"]) + " watt";
	break;


	case "home/zwave/10/switchmultilevel/1/level":
                buttononcolor = "#66ff66";
                buttonsceneoncolor = "#00ccff";
                buttonoffcolor = "";
		document.getElementsByClassName('domoticabutton')[3].style.backgroundColor = value > 0 ? buttononcolor : buttonoffcolor;
		document.getElementsByClassName('domoticabutton')[3].innerHTML = "Spots<BR>" + dv(mqttdata["home/zwave/10/switchmultilevel/1/level"]) + "%";//+" - " + dv(mqttdata["home/zwave/10/sensormultilevel/1/power"]) + " watt";
	break;

	case "home/zwave/11/switchmultilevel/1/level":
                buttononcolor = "#66ff66";
                buttonsceneoncolor = "#00ccff";
                buttonoffcolor = "";
		document.getElementsByClassName('domoticabutton')[2].style.backgroundColor = value > 0 ? buttononcolor : buttonoffcolor;
		document.getElementsByClassName('domoticabutton')[2].innerHTML = "Stalamp<BR>" + value + "%";
	break;

	case "home/zwave/11/colorswitch/1/color":
                buttononcolor = "#66ff66";
                buttonsceneoncolor = "#00ccff";
                buttonoffcolor = "";
/*		document.getElementsByClassName('domoticabutton')[22].style.backgroundColor = value == "#FF00000000" ? "#FF0000" : buttonoffcolor;
		document.getElementsByClassName('domoticabutton')[23].style.backgroundColor = value == "#00FF000000" ? "#00FF00" : buttonoffcolor;
		document.getElementsByClassName('domoticabutton')[24].style.backgroundColor = value == "#0000FF0000" ? "#0000FF" : buttonoffcolor;
		document.getElementsByClassName('domoticabutton')[25].style.backgroundColor = value == "#5522FF0000"  ? "#5522FF" : buttonoffcolor;
		document.getElementsByClassName('domoticainfo')[6].innerHTML = "Color="+value;
*/	break;

	case "home/zwave/10/sensormultilevel/1/power":
//		document.getElementsByClassName('domoticainfo')[0].innerHTML = dv(mqttdata["home/zwave/10/switchmultilevel/1/level"]) + "% - " + dv(mqttdata["home/zwave/10/sensormultilevel/1/power"] + " watt");
	break;

	case "home/zwave/4/switchbinary/1/switch":
		document.getElementsByClassName('domoticabutton')[0].style.backgroundColor = value == "true" ? buttononcolor : buttonoffcolor;
	break;

	case "home/zwave/3/switchbinary/1/switch":
                buttononcolor = "#66ff66";
                buttonsceneoncolor = "#00ccff";
                buttonoffcolor = "";
		document.getElementsByClassName('domoticabutton')[1].style.backgroundColor = value == "true" ? buttononcolor : buttonoffcolor;
	break;

	case "home/zwave/4/meter/1/power":
		document.getElementsByClassName('domoticabutton')[0].innerHTML = "TV<BR>" + dv(Math.round(value) + "W");
	break;

	case "home/zwave/3/meter/1/power":
		document.getElementsByClassName('domoticabutton')[1].innerHTML = "Dressoir<BR>" + dv(Math.round(value) + "W");
	break;
	
	case "home/zwave/3/switchbinary/1/switch":
                buttononcolor = "#66ff66";
                buttonoffcolor = "";
                buttonsceneoncolor = "#00ccff";
//		document.getElementsByClassName('domoticabutton')[18].style.backgroundColor = value != "true"   ? buttononcolor : buttonoffcolor;
//		document.getElementsByClassName('domoticabutton')[19].style.backgroundColor = value == "true" ? buttononcolor : buttonoffcolor;
	break;
	case "home/ESP_TUIN/relay/0":
		document.getElementById('sonoff1_0').style.backgroundColor = value != "0"   ? buttononcolor : buttonoffcolor;
	break;
	case "home/ESP_TUIN/relay/1":
		document.getElementById('sonoff1_1').style.backgroundColor = value != "0"   ? buttononcolor : buttonoffcolor;
	break;
	case "home/ESP_TUIN/relay/2":
		document.getElementById('sonoff1_2').style.backgroundColor = value != "0"   ? buttononcolor : buttonoffcolor;
	break;
	case "home/ESP_TUIN/relay/3":
		document.getElementById('sonoff1_3').style.backgroundColor = value != "0"   ? buttononcolor : buttonoffcolor;
	break;

	case "home/ESP_IRRIGATION/relay/0":
		document.getElementById('sonoff2_0').style.backgroundColor = value != "0"   ? buttononcolor : buttonoffcolor;
	break;
	case "home/ESP_IRRIGATION/relay/1":
		document.getElementById('sonoff2_1').style.backgroundColor = value != "0"   ? buttononcolor : buttonoffcolor;
	break;
	case "home/ESP_IRRIGATION/relay/2":
		document.getElementById('sonoff2_2').style.backgroundColor = value != "0"   ? buttononcolor : buttonoffcolor;
	break;
	case "home/ESP_IRRIGATION/relay/3":
		document.getElementById('sonoff2_3').style.backgroundColor = value != "0"   ? buttononcolor : buttonoffcolor;
	break;

	case "home/ESP_DUCOBOX/relay/0":
	case "home/ESP_DUCOBOX/relay/1":
		if ((typeof mqttdata["home/ESP_DUCOBOX/relay/0"] !== 'undefined') && (typeof mqttdata["home/ESP_DUCOBOX/relay/1"] !== 'undefined'))
		{
			document.getElementById('ventbuttonl').style.backgroundColor = ((mqttdata["home/ESP_DUCOBOX/relay/0"] == "0") && (mqttdata["home/ESP_DUCOBOX/relay/1"] == "0")) ? buttononcolor : buttonoffcolor;
			document.getElementById('ventbuttonm').style.backgroundColor = ((mqttdata["home/ESP_DUCOBOX/relay/0"] == "1") && (mqttdata["home/ESP_DUCOBOX/relay/1"] == "0")) ? buttononcolor : buttonoffcolor;
			document.getElementById('ventbuttonh').style.backgroundColor = ((mqttdata["home/ESP_DUCOBOX/relay/0"] == "0") && (mqttdata["home/ESP_DUCOBOX/relay/1"] == "1")) ? buttononcolor : buttonoffcolor;
		}
	break;

	case "home/zwave/3/meter/1/power":
	case "home/zwave/12/meter/1/power":
	case "home/zwave/13/meter/1/power":
//		document.getElementsByClassName('domoticainfo')[7].innerHTML = "<TABLE STYLE=\"margin:5%; margin-top:10%; table-layout:fixed; width:100%;\">"+
//		"<TR><TD>Wasmachine</TD><TD style=\"width: 50%; text-align:right\">" + mqttdata["home/zwave/3/meter/1/power"] + " watt</TD></TR>"+
//		"<TR><TD>Serverrack</TD><TD ALIGN=RIGHT>" + mqttdata["home/zwave/12/meter/1/power"] + " watt</TD></TR>"+
//		"<TR><TD>Vaatwasser</TD><TD ALIGN=RIGHT>" + mqttdata["home/zwave/13/meter/1/power"] + " watt</TD></TR>"+
//		"</TABLE>";
//		fillElectricityPage();
	break;	
  }
  
  if (message.destinationName.search("home/ESP_DUCOBOX") == 0) if (currentpage == "climatecontrol") fillClimateControlPage();
  if (message.destinationName.search("home/esp8266") == 0) if (currentpage == "climatecontrol") fillClimateControlPage();
  if (message.destinationName.search("home/ESP_OPENTHERM") == 0) if (currentpage == "climatecontrol") fillClimateControlPage();
  if (message.destinationName.search("home/growatt") == 0) if (currentpage == "sunelectricity") fillSunElectricityPage();
  if (message.destinationName.search("home/zwave/4/meter/1/voltage") == 0) if (currentpage == "electricity") fillElectricityPage();
  if (message.destinationName.search("home/esp8266/ESP_POWERMETER") == 0) if (currentpage == "electricity") fillElectricityPage();
  
}

var pageTimer;
var previousPageName = ['mainpage'];
var graphsource = "";
var graphtitle = "";
var graphlabel = "";

function sendzwave(nodeid, instanceid, commandclass, index, value)
{
	var topic="home/zwave/send/"+nodeid+"/"+instanceid+"/"+commandclass+"/"+index;
	console.log("MQTT-Sending:"+topic+"="+value); 
	
	client.send (topic, String(value), 0, false);
}

function objectnulltodash(obj)
{
	for(key in obj){
		if(obj[key] instanceof Object){
			objectnulltodash(obj[key]);
		}else{
			if (obj[key] == null) obj[key] = "-";
		}
	}	


}

//
// Filloverviewpage fills all the items in the overviewpages
//
/*function fillDomoticaPage()
{
	var titels = ["Spots Keuken", "Stalamp huiskamer", "Tv & Radio", "Lamp Eettafel", "Spots Huiskamer", "Scenes", "", ""];
	var elements = document.getElementById("domoticapage").getElementsByClassName("floating-box");
	for (var key = 0; key < elements.length; key++)
	{
		elements[key].getElementsByClassName("boxtitle")[0].innerHTML = titels[key];
	}

}*/
function settempup()
{
        var e = window.event; 
	e.cancelBubble = true;
	if (e.stopPropagation) e.stopPropagation();

	var topic="home/ESP_OPENTHERM/setthermostattemporary";

	var value=String(parseFloat(mqttdata["home/ESP_OPENTHERM/thermostat/setpoint"])+0.5); 

	console.log("MQTT-Sending:"+topic+"="+value); 
	client.send (topic, value, 0, false);

}

function settempdown()
{
        var e = window.event; 
        e.cancelBubble = true;
	if (e.stopPropagation) e.stopPropagation();

	var topic="home/ESP_OPENTHERM/setthermostattemporary";

	var value=String(parseFloat(mqttdata["home/ESP_OPENTHERM/thermostat/setpoint"])-0.5); 

	console.log("MQTT-Sending:"+topic+"="+value); 
	client.send (topic, value, 0, false);

}


function ventbuttonclick(buttonid)
{
        var e = window.event; 
	e.cancelBubble = true;
	if (e.stopPropagation) e.stopPropagation();
	client.send("home/ESP_DUCOBOX/setfan",String(buttonid),1,false);
}



function fillClimateControlPage()
{
	elements = document.getElementById("overviewpage").getElementsByClassName("floating-box");
	elements[7].getElementsByClassName("boxtoptext")[0].innerHTML = ""; 
	for (var key = 0; key < elements.length; key++)
	{
		titel = "";
		label1= "";
		value1 = "";
		label2 = "";
		value2 = "";
		    
		switch (key)
		{
			case 0:
			titel = "Cv Ketel"
                	        titel = "<font color=\""+(dv(mqttdata["home/ESP_OPENTHERM/status"]) == "online" ? "#00bb00" : "#ff0000")+"\">CV ketel</font>";
				label1 = "Boiler"
				value1 = mqttdata["home/ESP_OPENTHERM/boiler/temperature"] + " &deg;C";  
				overviewpagebar[key].max = 60;
				overviewpagebar[key].value = parseInt(mqttdata["home/ESP_OPENTHERM/boiler/temperature"]);
				overviewpagebar[key].grow();
				label2 = "Warmwater"
				value2 = mqttdata["home/ESP_OPENTHERM/dhw/temperature"] + " &deg;C";  
			break;  
			case 1:
                	        titel = "<font color=\""+(dv(mqttdata["home/ESP_OPENTHERM/status"]) == "online" ? "#00bb00" : "#ff0000")+"\">CV ketel</font>";
				label1 = "Retourwater"
				value1 = dv(mqttdata["home/temper2/chreturnwatertemperature"]) + " &deg;C";  
				overviewpagebar[key].max = 50;
				overviewpagebar[key].min = 20;
				overviewpagebar[key].value = parseInt(mqttdata["home/temper2/chreturnwatertemperature"]);
				overviewpagebar[key].grow();
				label2 = "Technische Ruimte"
				value2 = dv(mqttdata["home/temper2/technicalroomtemperature"]) + " &deg;C";
			break;  
			case 2:
                	        titel = "<font color=\""+(dv(mqttdata["home/ESP_OPENTHERM/status"]) == "online" ? "#00bb00" : "#ff0000")+"\">CV ketel</font>";
				label1 = "Vlam"
				value1 = mqttdata["home/ESP_OPENTHERM/burner/modulation/level"] + " %";  
				overviewpagebar[key].max = 100;
				overviewpagebar[key].value = parseInt(mqttdata["home/ESP_OPENTHERM/burner/modulation/level"]);
				overviewpagebar[key].grow();
				label2 = "CV Druk"
				value2 = mqttdata["home/ESP_OPENTHERM/ch/water/pressure"] + " bar";
			break;  
			case 3:

                	        titel = "<font color=\""+(dv(mqttdata["home/ESP_OPENTHERM/status"]) == "online" ? "#00bb00" : "#ff0000")+"\">Thermostaat</font>";
				label1 = "Water Instelling"
				value1 = mqttdata["home/ESP_OPENTHERM/thermostat/ch/water/setpoint"] + " &deg;C";    
				overviewpagebar[key].max = 60;
				overviewpagebar[key].value = parseInt(mqttdata["home/ESP_OPENTHERM/thermostat/ch/water/setpoint"]);
				overviewpagebar[key].grow();
				label2 = "Ruimte &Delta;T"
				value2 = parseFloat(mqttdata["home/ESP_OPENTHERM/thermostat/temperature"] - mqttdata["home/ESP_OPENTHERM/thermostat/setpoint"]).toFixed(1);
			break;
			case 4:
                	        titel = "<font color=\""+(dv(mqttdata["home/ESP_DUCOBOX/status"]) == "online" ? "#00bb00" : "#ff0000")+"\">Centrale Afzuiging</font>";
				label1 = "Ventilator"
				value1 = dv(mqttdata["home/ESP_DUCOBOX/1/fanspeed"]) + " rpm";
				overviewpagebar[key].max = 2500;
				overviewpagebar[key].value = mqttdata["home/ESP_DUCOBOX/1/fanspeed"];
				overviewpagebar[key].grow();
				label2 = ""
				value2 = "";
				break;  
			case 5:
                	        titel = "<font color=\""+(dv(mqttdata["home/ESP_DUCOBOX/status"]) == "online" ? "#00bb00" : "#ff0000")+"\">Klimaat Huiskamer</font>";
                	        label1 = "CO2"
 	                      	if ((mqttdata["home/ESP_DUCOBOX/2/co2"] != "") && (mqttdata["home/ESP_DUCOBOX/2/co2"] != undefined)) value1 = mqttdata["home/ESP_DUCOBOX/2/co2"] + " ppm";
 	                      	else value1 = "- ppm";
       	                        overviewpagebar[key].max = 1200;
       	                        overviewpagebar[key].min = 400;
               	                overviewpagebar[key].value = parseInt(mqttdata["home/ESP_DUCOBOX/2/co2"]);
                       	        overviewpagebar[key].grow();
	                        label2 = "Temperatuur"
        	                if ((mqttdata["home/ESP_DUCOBOX/2/temperature"] != "") && (mqttdata["home/ESP_DUCOBOX/2/temperature"] != undefined)) value2 = (mqttdata["home/ESP_DUCOBOX/2/temperature"]) + " &deg;C";
        	                else value2 = "- &deg;C";
                        break;
			case 6:
                	        titel = "<font color=\""+(dv(mqttdata["home/ESP_SLAAPKAMER2/status"]) == "online" ? "#00bb00" : "#ff0000")+"\">Klimaat Slaapkamer</font>";
                	        label1 = "CO2";
                	        value1 = dv(mqttdata["home/ESP_SLAAPKAMER2/mhz19/co2"]) + " ppm";
       	                        overviewpagebar[key].max = 1200;
       	                        overviewpagebar[key].min = 400;
               	                overviewpagebar[key].value = parseInt(mqttdata["home/ESP_SLAAPKAMER2/mhz19/co2"]);
                       	        overviewpagebar[key].grow();
	                        label2 = "Temperatuur"
                                value2 = dv(mqttdata["home/ESP_SLAAPKAMER2/dht22/temperature"]) + " &deg;C";
                        break;
			case 7:
				elements[key].getElementsByClassName("boxverticalbar")[0].style = "visibility: visible;";
                	        titel = "<font color=\""+(dv(mqttdata["home/ESP_BADKAMER/status"]) == "online" ? "#00bb00" : "#ff0000")+"\">Klimaat Badkamer</font>";
                	        label1 = "Luchtvochtigheid";
                	        value1 = dv(mqttdata["home/ESP_BADKAMER/dht22/humidity"])  + " %";
       	                        overviewpagebar[key].max = 100;
       	                        overviewpagebar[key].min = 0;
               	                overviewpagebar[key].value = parseInt(mqttdata["home/ESP_BADKAMER/dht22/humidity"]);
                       	        overviewpagebar[key].grow();
	                        label2 = "Temperatuur"
                                value2 = dv(mqttdata["home/ESP_BADKAMER/dht22/temperature"]) + " &deg;C";
                        break;

		}
		elements[key].getElementsByClassName("boxtitle")[0].innerHTML = titel;
		elements[key].getElementsByClassName("boxvalue")[0].innerHTML = value1;
		elements[key].getElementsByClassName("boxvalue2")[0].innerHTML = value2;
		elements[key].getElementsByClassName("boxlabelsmall")[0].innerHTML = label1;
		elements[key].getElementsByClassName("boxlabel2small")[0].innerHTML = label2;
	}
}

function fillSunElectricityPage()
{
	fillOverviewPage("sunelectricity");
	elements = document.getElementById("overviewpage").getElementsByClassName("floating-box");
	elements[7].getElementsByClassName("boxtoptext")[0].innerHTML = 
	"<TABLE STYLE=\"margin:0; table-layout:fixed; width:100%;\">" + 
	"<TR><TD>Netvermogen</TD><TD style=\"width: 50%; text-align:right\">" + mqttdata["home/growatt/grid/watt"] + " W</TD></TR>" + 
	"<TR><TD>Netspanning</TD><TD style=\"width: 50%; text-align:right\">" + mqttdata["home/growatt/grid/volt"] + " V</TD></TR>" + 
	"<TR><TD>Frequentie</TD><TD style=\"width: 50%; text-align:right\">" + mqttdata["home/growatt/grid/frequency"] + " Hz</TD></TR>" + 
	"<TR><TD>PVvermogen</TD><TD style=\"width: 50%; text-align:right\">" + mqttdata["home/growatt/pv/watt"] + " W</TD></TR>" + 
	"<TR><TD>PVspanning</TD><TD style=\"width: 50%; text-align:right\">" + mqttdata["home/growatt/pv/1/volt"] + " V</TD></TR>" + 
	"</TABLE>";
}

function dv(value)
{
  if (typeof value == 'undefined') return "-";
  if (typeof value == "string")
  {
  	if ((value == null) || (value == "") || (value == "NaN")) return "-";
	  else return value;
  }
  else
  {
  	if ((value == null) || (isNaN(value))) return "-";
	  else return value;
  }
}

function fillElectricityPage()
{
	fillOverviewPage("electricitymeter");
	elements = document.getElementById("overviewpage").getElementsByClassName("floating-box");
     	var wattTotal = (mqttdata["home/esp8266/ESP_POWERMETER/powermeter/0/mVA"]/1000+mqttdata["home/esp8266/ESP_POWERMETER/powermeter/1/mVA"]/1000+mqttdata["home/esp8266/ESP_POWERMETER/powermeter/2/mVA"]/1000+
	mqttdata["home/esp8266/ESP_POWERMETER/powermeter/3/mVA"]/1000+mqttdata["home/esp8266/ESP_POWERMETER/powermeter/4/mVA"]/1000+mqttdata["home/esp8266/ESP_POWERMETER/powermeter/5/mVA"]/1000+
	mqttdata["home/esp8266/ESP_POWERMETER/powermeter/6/mVA"]/1000+mqttdata["home/esp8266/ESP_POWERMETER/powermeter/7/mVA"]/1000-mqttdata["home/esp8266/ESP_POWERMETER/powermeter/8/mVA"]/1000+
	mqttdata["home/esp8266/ESP_POWERMETER/powermeter/9/mVA"]/1000+mqttdata["home/esp8266/ESP_POWERMETER/powermeter/10/mVA"]/1000+mqttdata["home/esp8266/ESP_POWERMETER/powermeter/11/mVA"]/1000).toFixed(1);
	elements[7].getElementsByClassName("boxtoptext")[0].innerHTML = 
	"<TABLE CLASS=\"infobox\">" +
	"<TR><TD colspan=5 ALIGN=CENTER>Groepen (VA)</TD></TR>" + 
	"<TR><TD>1</TD><TD AlIGN=RIGHT>" + dv((mqttdata["home/esp8266/ESP_POWERMETER/powermeter/0/mVA"]/1000).toFixed(1)) + "</TD><TD></TD><TD>7</TD><TD AlIGN=RIGHT>" + dv((mqttdata["home/esp8266/ESP_POWERMETER/powermeter/6/mVA"]/1000).toFixed(1))  + "</TD></TR>" + 
	"<TR><TD>2</TD><TD AlIGN=RIGHT>" + dv((mqttdata["home/esp8266/ESP_POWERMETER/powermeter/1/mVA"]/1000).toFixed(1)) + "</TD><TD></TD><TD>8</TD><TD AlIGN=RIGHT>" + dv((mqttdata["home/esp8266/ESP_POWERMETER/powermeter/7/mVA"]/1000).toFixed(1))  + "</TD></TR>" + 
	"<TR><TD>3</TD><TD AlIGN=RIGHT>" + dv((mqttdata["home/esp8266/ESP_POWERMETER/powermeter/2/mVA"]/1000).toFixed(1)) + "</TD><TD></TD><TD>9</TD><TD AlIGN=RIGHT>" + dv((-mqttdata["home/esp8266/ESP_POWERMETER/powermeter/8/mVA"]/1000).toFixed(1))  + "</TD></TR>" + 
	"<TR><TD>4</TD><TD AlIGN=RIGHT>" + dv((mqttdata["home/esp8266/ESP_POWERMETER/powermeter/3/mVA"]/1000).toFixed(1)) + "</TD><TD></TD><TD>10</TD><TD AlIGN=RIGHT>" + dv((mqttdata["home/esp8266/ESP_POWERMETER/powermeter/9/mVA"]/1000).toFixed(1))  + "</TD></TR>" + 
	"<TR><TD>5</TD><TD AlIGN=RIGHT>" + dv((mqttdata["home/esp8266/ESP_POWERMETER/powermeter/4/mVA"]/1000).toFixed(1)) + "</TD><TD></TD><TD>11</TD><TD AlIGN=RIGHT>" + dv((mqttdata["home/esp8266/ESP_POWERMETER/powermeter/10/mVA"]/1000).toFixed(1))  + "</TD></TR>" + 
	"<TR><TD>6</TD><TD AlIGN=RIGHT>" + dv((mqttdata["home/esp8266/ESP_POWERMETER/powermeter/5/mVA"]/1000).toFixed(1)) + "</TD><TD></TD><TD>12</TD><TD AlIGN=RIGHT>" + dv((mqttdata["home/esp8266/ESP_POWERMETER/powermeter/11/mVA"]/1000).toFixed(1))  + "</TD></TR>" + 
	"</TABLE>" +
	"<TABLE CLASS=\"infobox\">" + 
	"<TR><TD colspan=2>Totaal: " + dv(wattTotal) + " VA</TD></TR>" + 
	"<TR><TD colspan=2>Netspanning: " + dv(mqttdata["home/zwave/4/meter/1/voltage"]) + " V</TD></TR>" + 
	"</TABLE>";

}


function fillOverviewPage(nodename)
{
	elements = document.getElementById("overviewpage").getElementsByClassName("floating-box");

	var titels = [];
	var unit = "";
	var mqttitems1 = [];
	var mqttitems2 = [];
	var jsonunit = "";
	var label1 = "";
	var label2 = "";

	if (nodename == "electricitymeter")
	{
		titels = ["Vandaag", "Deze Maand", "Dit Jaar", "Totaal", "Gisteren", "Vorige Maand", "Vorig Jaar", ""];
		unit = "kwh"
		mqttitems1 = ["home/casaan/electricity/today/kwh_used",  "home/casaan/electricity/month/kwh_used", "home/casaan/electricity/year/kwh_used", "home/ESP_SMARTMETER/electricity/kwh_used", "home/casaan/electricity/yesterday/kwh_used", "home/casaan/electricity/lastmonth/kwh_used", "home/casaan/electricity/lastyear/kwh_used", ""];
		mqttitems2 = ["home/casaan/electricity/today/kwh_provided",  "home/casaan/electricity/month/kwh_provided", "home/casaan/electricity/year/kwh_provided", "home/ESP_SMARTMETER/electricity/kwh_provided", "home/casaan/electricity/yesterday/kwh_provided", "home/casaan/electricity/lastmonth/kwh_provided", "home/casaan/electricity/lastyear/kwh_provided", ""];
		label1 = "Verbruikt";
		jsonunit = "kwh_used";
		label2 = "Teruggeleverd";
		jsonunit2 = "kwh_provided";
	}
	
	if (nodename == "sunelectricity")
	{
		titels = ["Vandaag", "Deze Maand", "Dit Jaar", "Totaal", "Gisteren", "Vorige Maand", "Vorig Jaar", "Info"];
		unit = "kwh"
		mqttitems1 = ["home/growatt/grid/today/kwh",  "home/growatt/grid/month/kwh", "home/growatt/grid/year/kwh", "home/growatt/grid/total/kwh", "home/growatt/grid/yesterday/kwh", "home/growatt/grid/lastmonth/kwh", "home/growatt/grid/lastyear/kwh", ""];
		label1 = "Opgewekt";
		jsonunit = "kwh";
	}
	
	if (nodename == "gasmeter")
	{
		titels = ["Vandaag", "Deze Maand", "Dit Jaar", "Totaal", "Gisteren", "Vorige Maand", "Vorig Jaar", ""];
		unit = "m3"
		mqttitems1 = ["home/casaan/gas/today/m3", "home/casaan/gas/month/m3", "home/casaan/gas/year/m3", "home/ESP_SMARTMETER/gas/m3",  "home/casaan/gas/yesterday/m3", "home/casaan/gas/lastmonth/m3", "home/casaan/gas/lastyear/m3", ""];
		jsonunit = "m3";
	}
	
	if (nodename == "watermeter")
	{
		titels = ["Vandaag", "Deze Maand", "Dit Jaar", "Totaal", "Gisteren", "Vorige Maand", "Vorig Jaar", ""];
		unit = "m3"
		mqttitems1 = ["home/watermeter/today/m3", "home/watermeter/month/m3", "home/watermeter/year/m3", "home/watermeter/m3",  "home/watermeter/yesterday/m3", "home/watermeter/lastmonth/m3", "home/watermeter/lastyear/m3", ""];
		jsonunit = "m3";
	}

	if (nodename == "temperature")
	{
		titels = ["Huiskamer", "Slaapkamer", "Badkamer", "Zolder", "Buiten", "Koelkast", "Diepvriezer", "CV"];
		unit = " &deg;C"
		jsonitems = ["huiskamer", "slaapkamer", "badkamer", "zolder", "buiten", "koelkast", "diepvriezer", "cv"];
		jsonunit = "";	
	}

	for (var key = 0; key < elements.length; key++)
	{
		var value1 = null;
		try
		{
			if (mqttdata[mqttitems1[key]] != "") value1 = mqttdata[mqttitems1[key]];
		}
		catch (err)
		{
			
		}
		var value2 = null;
		try
		{
			if (mqttdata[mqttitems2[key]] != "") value2 = mqttdata[mqttitems2[key]];
		}
		catch (err)
		{
			
		}
		if ((nodename == "sunelectricitymeter") || (nodename == "electricitymeter"))
		{
			if (value1 != null) value1 = Math.round(value1*10)/10;
			if (value1 != null) value2 = Math.round(value2*10)/10;
		}
		if (nodename == "gasmeter")
		{
			if (value1 != null) value1 = Math.round(value1*1000)/1000;
			if (value1 != null) value2 = Math.round(value2*1000)/1000;
		}
		if (value1 != null) value1 = value1 + " " + unit;
		else value1 = "";
		
		if (label2 != "")
		{
			if (value2 != null) value2 = value2 + " " + unit;
			else value2 = "";
		}
		else value2="";
		
		if (value1 != "")
		{
			elements[key].getElementsByClassName("boxtitle")[0].innerHTML = titels[key];
			elements[key].getElementsByClassName("boxvalue")[0].innerHTML = value1;
			elements[key].getElementsByClassName("boxvalue2")[0].innerHTML = value2;
			elements[key].getElementsByClassName("boxlabelsmall")[0].innerHTML = label1;
			elements[key].getElementsByClassName("boxlabel2small")[0].innerHTML = label2;
			elements[key].getElementsByClassName("boxverticalbar")[0].style = "visibility: visible;";

		}
		else
		{
			elements[key].getElementsByClassName("boxtitle")[0].innerHTML = titels[key];
			elements[key].getElementsByClassName("boxvalue")[0].innerHTML = "" ;
			elements[key].getElementsByClassName("boxvalue2")[0].innerHTML = "";
			elements[key].getElementsByClassName("boxlabelsmall")[0].innerHTML = "";
			elements[key].getElementsByClassName("boxlabel2small")[0].innerHTML = "";
			elements[key].getElementsByClassName("boxverticalbar")[0].style = "visibility: hidden;";
		}
	}
	elements[7].getElementsByClassName("boxtitle")[0].innerHTML = "Info";
	elements[7].getElementsByClassName("boxtoptext")[0].innerHTML = ""; 
	
}

//
// showPage hides the current page and shows the page selected
//


function showPage(pageName) {
	currentpage = pageName;
        document.getElementById("graphbuttons").style.display = "none";
	document.getElementsByClassName("ventbuttons")[0].style.display="none" 
	elements = document.getElementById("overviewpage").getElementsByClassName("floating-box");

        for (var key = 0; key < elements.length-1; key++)
        {
                overviewpagebar[key].max = 10;
                overviewpagebar[key].value = 0;
                overviewpagebar[key].grow();
	}

	if (pageName == '') pageName = 'mainpage';
	if (pageName == "previouspage")
	{
		previousPageName.pop();
		var pageName = previousPageName.pop();
		if (pageName == 'mainpage') window.location='#';
		if (pageName == '') pageName = window.location='#';
	}
	if (pageName == "mainpage")
	{
		document.getElementsByClassName("backbutton")[0].style.display = "none"; 
	}
	else
	{
		document.getElementsByClassName("backbutton")[0].style.display = "inline-block"; 
	}
	previousPageName.push(pageName)
	console.log("Opening page:"+pageName);
	clearTimeout(pageTimer);
	var i;
	var x = document.getElementsByClassName("submainarea");
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none"; 
	}
	if (pageName == "sunelectricity")
	{
		graphjsonsource = "sunelectricity";
		graphjsonitem1 = "kwh_out";
		graphjsonitem2 = "kwh_pv"
		graphunit = "kwh";
		graphtitle = "Zonnestroom";
		graphylabel = "kwh";
		graphcolors = ["#00FF00", "#00FFFF"];
		graphnames = ["Geleverd Omvormer", "Opgewekt Zonnepanelen"];
		document.getElementById("overviewpage").style.display = "inline-block"; 
		fillSunElectricityPage();
	}
	else if (pageName == "electricity")
	{
		graphmqttmonth = "home/casaan/electricity/month/graph/kwh";
		graphmqttday = "home/casaan/electricity/day/graph/kwh";
		graphmqttyear = "home/casaan/electricity/year/graph/kwh";
		graphylabel = "kwh";
		graphtitle = "Netstroom";
		graphcolors = ["#666666", "#00FF00"];
		graphnames = ["Verbruikt"];
		document.getElementById("overviewpage").style.display = "inline-block"; 
		fillElectricityPage();
	}
	else if (pageName == "gas")
	{
		graphmqttmonth = "home/casaan/gas/month/graph/m3";
		graphmqttday = "home/casaan/gas/day/graph/m3";
		graphmqttyear = "home/casaan/gas/year/graph/m3";
		graphylabel = "m3";
		graphtitle = "Gasgebruik";
		graphcolors = ["#FFFF00"];
		graphnames = ["Verbruikt"];
		document.getElementById("overviewpage").style.display = "inline-block"; 
		fillOverviewPage("gasmeter");
	}
	else if (pageName == "water")
	{
		graphjsonsource = "watermeter";
		graphjsonitem1 = "m3";
		graphjsonitem2 = "";
		graphylabel = "m3";
		graphtitle = "Watergebruik";
		graphcolors = ["#0000FF"];
		graphnames = ["Verbruikt"];
		document.getElementById("overviewpage").style.display = "inline-block"; 
		fillOverviewPage("watermeter");
	}
	else if (pageName == "climatecontrol")
	{
		document.getElementById("overviewpage").style.display = "inline-block"; 
		document.getElementsByClassName("ventbuttons")[0].style.display="inline-block"; 
		fillClimateControlPage();
	}
	else if (pageName == "graphdaypage")
	{
		document.getElementById("graphpage").style.display = "inline-block"; 
		document.getElementById("graphbuttons").style.display = "inline-block";
		values = [];
		values[0] = [];
		labels = [];
		try
		{
			for (var i in $.parseJSON(mqttdata[graphmqttday]))
			{
				labels.push(i);
				values[0].push(parseFloat(parseFloat($.parseJSON(mqttdata[graphmqttday])[i]).toFixed(3)));
		//	values[1] = casaandata[graphjsonsource].month.graph[graphjsonitem2];
			}
		}
		catch(err)
		{
		}
		drawgraph("graph", graphtitle, "Uur", graphylabel, graphnames, labels, values, graphcolors);
	}
	else if (pageName == "graphmonthpage")
	{
		document.getElementById("graphpage").style.display = "inline-block"; 
		document.getElementById("graphbuttons").style.display = "inline-block";
		values = [];
		values[0] = [];
		labels = [];
		try
		{
			for (var i in $.parseJSON(mqttdata[graphmqttmonth]))
			{
				labels.push(i);
				values[0].push(parseFloat(parseFloat($.parseJSON(mqttdata[graphmqttmonth])[i]).toFixed(1)));
		//	values[1] = casaandata[graphjsonsource].month.graph[graphjsonitem2];
			}
		}
		catch(err)
		{
		}
		drawgraph("graph", graphtitle, "Dag", graphylabel, graphnames, labels, values, graphcolors);
	}
	else if (pageName == "graphyearpage")
	{
		document.getElementById("graphpage").style.display = "inline-block"; 
		document.getElementById("graphbuttons").style.display = "inline-block";
		values = [];
		values[0] = [];
		labels = [];
		try
		{
			for (var i in $.parseJSON(mqttdata[graphmqttyear]))
			{
				labels.push(i);
				values[0].push(parseFloat(parseFloat($.parseJSON(mqttdata[graphmqttyear])[i]).toFixed(1)));
		//	values[1] = casaandata[graphjsonsource].month.graph[graphjsonitem2];
			}
		}
		catch(err)
		{
		}
		drawgraph("graph", graphtitle, "Week", graphylabel, graphnames, labels, values, graphcolors);
	}
	else if (pageName == "graphtotalpage")
	{
		document.getElementById("graphbuttons").style.display = "inline-block";
		document.getElementById("graphpage").style.display = "inline-block"; 
		values = [];
		labels = [];
		try
		{
			labels = casaandata[graphjsonsource].total.graph.labels;
			values[0] = casaandata[graphjsonsource].total.graph[graphjsonitem1];
			values[1] = casaandata[graphjsonsource].total.graph[graphjsonitem2];
		}
		catch(err)
		{
		}
		drawgraph("graph", graphtitle, "Jaar", graphylabel, graphnames, labels, values, graphcolors);
	}
	else if (pageName == "graphpreviousdaypage")
	{
		document.getElementById("graphpage").style.display = "inline-block"; 
		document.getElementById("graphbuttons").style.display = "inline-block";
		try
		{
			labels = casaandata[graphjsonsource].yesterday.graph.labels;
			values[0] = casaandata[graphjsonsource].yesterday.graph[graphjsonitem1];
			values[1] = casaandata[graphjsonsource].yesterday.graph[graphjsonitem2];
		}
		catch(err)
		{
		}
		drawgraph("graph", graphtitle + " gisteren", "Uur", graphylabel, graphnames, labels, values, graphcolors);
	}
	else if (pageName == "graphpreviousmonthpage")
	{
		document.getElementById("graphpage").style.display = "inline-block"; 
		document.getElementById("graphbuttons").style.display = "inline-block";
		try
		{
			labels = casaandata[graphjsonsource].previousmonth.graph.labels;
			values[0] = casaandata[graphjsonsource].previousmonth.graph[graphjsonitem1];
			values[1] = casaandata[graphjsonsource].previousmonth.graph[graphjsonitem2];
		}
		catch(err)
		{
		}
		drawgraph("graph", graphtitle  + " vorige maand", "Dag", graphylabel, graphnames, labels, values, graphcolors);
	}
	else if (pageName == "graphpreviousyearpage")
	{
		document.getElementById("graphpage").style.display = "inline-block"; 
		document.getElementById("graphbuttons").style.display = "inline-block";
		try
		{
			labels = casaandata[graphjsonsource].previousyear.graph.labels;
			values[0] = casaandata[graphjsonsource].previousyear.graph[graphjsonitem1];
			values[1] = casaandata[graphjsonsource].previousyear.graph[graphjsonitem2];
		}
		catch(err)
		{
		}
		drawgraph("graph", graphtitle  + " vorig jaar", "Maand", graphylabel, graphnames, labels, values, graphcolors);
	}
	
	
	else if (document.getElementById(pageName)) document.getElementById(pageName).style.display = "inline-block"; 
	else document.getElementById("mainpage").style.display = "inline-block";
	autochangesizes();
	
	if (pageName != "mainpage") pageTimer = setTimeout(function(){window.location='#';}, 600000);
}

function drawgraph(graphname, graphtitle, xtitle, ytitle, names, labels, values, colors)
{
	
if (values[1] != undefined)
{
	var chart = Highcharts.chart('graph', 
	{
chart: 
		{
type: 'column'
		},
title: 
		{
text: graphtitle
		},
legend: {
enabled: true
		},
exporting: { enabled: false },
xAxis: {
title: {
text: xtitle
			},
categories: labels
		},
yAxis: {
title: {
text: ytitle
			}
		},
credits: {
enabled: false
		},
colors: colors,
plotOptions: {
    column: {
        pointPadding: 0,
        borderWidth: 2,
        groupPadding: 0,
        shadow: false
    },
series: {
dataLabels: {
enabled: true,
format: '{point.y:f}'

				},
enableMouseTracking: false
			}
		},
series: [{
name: names[0],
data: values[0],
		},
		{
name: names[1],
data: values[1]
		}]
	});
}
else
{
		var chart = Highcharts.chart('graph', 
	{
chart: 
		{
type: 'column'
		},
title: 
		{
text: graphtitle
		},
legend: {
enabled: true
		},
exporting: { enabled: false },
xAxis: {
title: {
text: xtitle
			},
categories: labels
		},
yAxis: {
title: {
text: ytitle
			}
		},
credits: {
enabled: false
		},
colors: colors,



plotOptions: {
    column: {
        pointPadding: 0,
        borderWidth: 2,
        groupPadding: 0,
        shadow: false
    },
series: {
dataLabels: {
enabled: true,
format: '{point.y:f}'
				},
enableMouseTracking: false
			}
		},
series: [{
name: names[0],
data: values[0],
negativeColor: 'green'
}],
	});

}	
	
}

function starttimepage()
{
	var times = SunCalc.getTimes(new Date(), 51.5, -0.1);
	document.getElementById("sun").innerHTML = "Op: "+
	(times.sunrise ? times.sunrise.getHours()+":"+times.sunrise.getMinutes() : "") + "<BR>Onder:  " +
	(times.sunset ? times.sunset.getHours()+":"+times.sunset.getMinutes() : "");

	var moontimes = SunCalc.getMoonTimes(new Date(), 51.5, -0.1);
	document.getElementById("moon").innerHTML = "Op: "+
	(moontimes.rise ? moontimes.rise.getHours()+":"+moontimes.rise.getMinutes() : "") + "<BR>Onder:  " +
	(moontimes.set ? moontimes.set.getHours()+":"+moontimes.set.getMinutes() : "") ;
}

function updateTime() {
	moment.locale('nl');
	document.getElementById("time").innerHTML = moment().format('LTS');
	document.getElementById("date").innerHTML = moment().format('L');
	document.getElementById("timenl").innerHTML = moment().format('LT');
	document.getElementById("datenl").innerHTML = moment().format('L');

	document.getElementById("timeen").innerHTML = moment().tz('Europe/London').format('LT');
	document.getElementById("dateen").innerHTML = moment().tz('Europe/London').format('L');

	document.getElementById("timeny").innerHTML = moment().tz('America/New_York').format('LT');
	document.getElementById("dateny").innerHTML = moment().tz('America/New_york').format('L');

	document.getElementById("timech").innerHTML = moment().tz('Asia/Shanghai').format('LT');
	document.getElementById("datech").innerHTML = moment().tz('Asia/Shanghai').format('L');
}

// Get data from buienradar.nl

function updateWeather() {
	console.log("Received buienradar update");
	for (i in casaandata.buienradarnl.weergegevens.actueel_weer.weerstations)
	{
		var station = casaandata.buienradarnl.weergegevens.actueel_weer.weerstations[i].weerstation;
		var stationnaam = station.stationnaam[0];
		if (stationnaam == "Meetstation Eindhoven")
		{
			elements = document.getElementsByClassName('weathertemptoday');
			for(var y=0; y<elements.length; y++)
			{
				elements[y].innerHTML = station.temperatuurGC[0] + " &deg;C";
			}
			
			var zin = station.icoonactueel["@attributes"].zin;
			elements = document.getElementsByClassName('weathertexttoday');
			for(var y=0; y<elements.length; y++)
			{
				elements[y].innerHTML = zin;
			}
			document.getElementById("windnow").innerHTML = station.windsnelheidBF + " Bft<BR>" + station.windrichting;
		}
	}

	document.getElementsByClassName('weathertext')[0].innerHTML = 
	casaandata.buienradarnl.weergegevens.verwachting_vandaag.samenvatting[0];

	document.getElementById("temptomorrow").innerHTML =
	casaandata.buienradarnl.weergegevens.verwachting_meerdaags["dag-plus1"].mintemp + " / " + 
	+ casaandata.buienradarnl.weergegevens.verwachting_meerdaags["dag-plus1"].maxtemp + " &deg;C";
	
	document.getElementById("tempaftertomorrow").innerHTML =
	casaandata.buienradarnl.weergegevens.verwachting_meerdaags["dag-plus2"].mintemp + " / " + 
	+ casaandata.buienradarnl.weergegevens.verwachting_meerdaags["dag-plus2"].maxtemp + " &deg;C";

	document.getElementById("tempafteraftertomorrow").innerHTML =
	casaandata.buienradarnl.weergegevens.verwachting_meerdaags["dag-plus3"].mintemp + " / " + 
	+ casaandata.buienradarnl.weergegevens.verwachting_meerdaags["dag-plus3"].maxtemp + " &deg;C";

	document.getElementById("tempafterafteraftertomorrow").innerHTML =
	casaandata.buienradarnl.weergegevens.verwachting_meerdaags["dag-plus4"].mintemp + " / " + 
	+ casaandata.buienradarnl.weergegevens.verwachting_meerdaags["dag-plus4"].maxtemp + " &deg;C";
	
	document.getElementById("weathertextlong").innerHTML =
	casaandata.buienradarnl.weergegevens.verwachting_vandaag.tekst[0];
	
	var d = new Date();
	d.setDate(d.getDate()+1);
	var daynames = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
	elements = document.getElementsByClassName('nametoday+1');
	for(i=0; i<elements.length; i++)
	{
		elements[i].innerHTML = daynames[d.getDay()];
	}
	d.setDate(d.getDate()+1);
	elements = document.getElementsByClassName('nametoday+2');
	for(i=0; i<elements.length; i++)
	{
		elements[i].innerHTML = daynames[d.getDay()];
	}
	d.setDate(d.getDate()+1);
	elements = document.getElementsByClassName('nametoday+3');
	for(i=0; i<elements.length; i++)
	{
		elements[i].innerHTML = daynames[d.getDay()];
	}
	d.setDate(d.getDate()+1);
	elements = document.getElementsByClassName('nametoday+4');
	for(i=0; i<elements.length; i++)
	{
		elements[i].innerHTML = daynames[d.getDay()];
	}
}