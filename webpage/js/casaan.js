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

var weekday = new Array(7);
weekday[0] = "Zondag";
weekday[1] = "Maandag";
weekday[2] = "Dinsdag";
weekday[3] = "Woendag";
weekday[4] = "Donderdag";
weekday[5] = "Vrijdag";
weekday[6] = "Zaterdag";

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
		floatingboxWidthHeight = clientHeight / 4.5;
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

	var elements = document.querySelectorAll("ul.tab");
        for(var i=0; i<elements.length; i++)
        {
                elements[i].style.height = (clientHeight/19) + "px";
        }

	// Auto size footer bar items
	var clientHeight = document.getElementsByClassName('footer')[0].clientHeight;
	elements = document.querySelectorAll('.label, .backbutton, .menuitem, .footer .footerbutton');
	for(var i=0; i<elements.length; i++)
	{
		elements[i].style.fontSize = (floatingboxWidthHeight  / 10) + "px";
	}

//	document.getElementsByClassName('label')[0].style.fontSize = (floatingboxWidthHeight / 10) + "px";
	document.getElementsByClassName('mainarea')[0].style.bottom = document.getElementsByClassName('footer')[0].clientHeight + "px";

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

	elements = document.querySelectorAll('.domoticabutton, .tempbutton');
	for(i=0; i<elements.length; i++)
	{
		elements[i].style.width = floatingboxWidthHeight /3 + "px";
		elements[i].style.height = floatingboxWidthHeight /3 + "px";
		elements[i].style.fontSize = floatingboxWidthHeight /15 + "px";
	}

	elements = document.getElementsByClassName('tempbutton');
	for(i=0; i<elements.length; i++)
	{
		elements[i].style.width = floatingboxWidthHeight /4 + "px";
		elements[i].style.height = floatingboxWidthHeight /4 + "px";
//		elements[i].style.fontSize = floatingboxWidthHeight /10 + "px";
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
		element.style.fontSize = "80px";
		for (var i = 60; (element.offsetHeight > clientHeight) && (i > 1); i--)
		{
			document.getElementById("weathertextlong").style.fontSize = i + "px";
		}
	}


		element = document.getElementById("boxweathertext");
		clientHeight =  element.clientHeight;
		clientWidth =  element.clientWidth;

		element = document.getElementById("weathertext");
		if (clientHeight > 0)
		{
			element.style.fontSize = "6px";
			var i;
			for (i = 6; (element.offsetHeight < clientHeight) && (i < 60); i++)
			{
				element.style.fontSize = i + "px";
			}
			element.style.fontSize = (i-2) + "px";
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

var barbgcolor = '#555555';

function createBars()
{
	waterbar = new RGraph.VProgress(
	{
id: 'waterbar',
min: 0,
max: 10,
value: 0,
options: {
textAccessible: true,
tickmarks: false,
shadow: false,
colors: ['#5ff'],
backgroundColor: barbgcolor,
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
colors: ['#f55'],
backgroundColor: barbgcolor,
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
max: 1,
value: 0,
options: {
textAccessible: true,
tickmarks: false,
shadow: false,
colors: ['#ff5'],
backgroundColor: barbgcolor,
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
max: 2500,
value: 0,
options: {
textAccessible: true,
tickmarks: false,
shadow: false,
colors: ['#fff'],
backgroundColor: barbgcolor,
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
max: 2600,
value: 0,
options: {
textAccessible: true,
tickmarks: false,
shadow: false,
colors: ['#7d7'],
backgroundColor: barbgcolor,
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
colors: ['#5ff'],
backgroundColor: barbgcolor,
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

function toggleprinter()
{
	topic="home/SONOFF_PRINTER/setrelay/0";
	newvalue=mqttdata["home/SONOFF_PRINTER/relay/0"] == "0" ? "1" : "0"; 
	
	console.log("MQTT-Sending:"+topic+"="+newvalue); 
	client.send (topic, newvalue, 0, false);
}

function togglecoffeelamp()
{
	topic="home/SONOFF_COFFEELAMP/setrelay/0";
	newvalue=mqttdata["home/SONOFF_COFFEELAMP/relay/0"] == "0" ? "1" : "0"; 

	console.log("MQTT-Sending:"+topic+"="+newvalue); 
	client.send (topic, newvalue, 0, false);
}

function sonoffcolordim(id)
{
	topic = "";
	if (id == 0)
	{
		topic="home/SONOFF_BULB/setcolor";
		valuetopic = "home/SONOFF_BULB/color";
	}
	
	if (topic != "")
	{
		if (mqttdata[valuetopic] == "3300001100") newvalue = "FF00008800"
		else if (mqttdata[valuetopic] == "FF00008800") newvalue = "FFFFFFFFFF"
		else if (mqttdata[valuetopic] == "0000000000") newvalue = "3300001100"
		else newvalue = "0000000000";

		console.log("MQTT-Sending:"+topic+"="+newvalue); 
		client.send (topic, newvalue, 0, false);
	}
}

function sonoffsetcolor(color)
{
	topic="home/SONOFF_BULB/setcolor";
	console.log("MQTT-Sending:"+topic+"="+color); 
	client.send (topic, color, 0, false);
}


function createDomoticaPage()
{
	var domoticapagestring = '';
	domoticapagestring += '<div class="floating-box"><div class="boxtitle">Zithoek</div><div class="domoticabuttons"><div>';
	domoticapagestring += '<button class="domoticabutton" id="zithoek_tv" onclick="mqtttoggle(1)">Tv</button>';
	domoticapagestring += '<button class="domoticabutton" id="zithoek_zoutlamp" onclick="mqtttoggle(4);">Zoutlamp</button><BR>';
	domoticapagestring += '<button class="domoticabutton" id="zithoek_dressoir" onclick="mqttdim(1)">Dressoir</button>';
	domoticapagestring += '<button class="domoticabutton" id="zithoek_spots" onclick="zwavedim(4)">Spots</button></div>';
	domoticapagestring += '</div><div class="domoticainfo"></div></div>';
	
	domoticapagestring += '<div class="floating-box"><div class="boxtitle">Eethoek / Keuken</div><div class="domoticabuttons"><div>';
	domoticapagestring += '<button class="domoticabutton" id="eethoek_stalamp" onclick="sonoffcolordim(0)">Stalamp</button>';
	domoticapagestring += '<button class="domoticabutton" id="eethoek_eettafel" onclick="zwavedim(3)">Eettafel</button><BR>';
	domoticapagestring += '<button class="domoticabutton" id="keuken_spots" onclick="zwavedim(2)">Spots</button>';
	domoticapagestring += '<button class="domoticabutton" id="keuken_coffeelamp" onclick="togglecoffeelamp();">Koffie<BR>Lamp</button>';
	domoticapagestring += '</div></div><div class="domoticainfo"></div></div>';
	
	domoticapagestring += '<span class="portraitbr"></span><div class="floating-box"><div class="boxtitle">Vijver</div><div class="domoticabuttons"><div>';
	domoticapagestring += '<button class="domoticabutton" id="sonoff1_0" onclick="toggletuinrelay(0);">Pomp1</button>';
	domoticapagestring += '<button class="domoticabutton" id="sonoff1_1" onclick="toggletuinrelay(1);">Pomp2</button><br>';
	domoticapagestring += '<button class="domoticabutton" id="sonoff1_2" onclick="toggletuinrelay(2);">UV</button>';
	domoticapagestring += '<button class="domoticabutton" id="sonoff1_3" onclick="toggletuinrelay(3);">Vogel<BR>verjager</button>';
	domoticapagestring += '</div></div><div class="domoticainfo"></div></div>';
	
	domoticapagestring += '<div class="floating-box"><div class="boxtitle">Sproeiers</div><div class="domoticabuttons"><div>';
	domoticapagestring += '<button class="domoticabutton" id="sonoff2_0" onclick="togglesproeierrelay(0);">Voortuin</button>';
	domoticapagestring += '<button class="domoticabutton" id="sonoff2_1" onclick="togglesproeierrelay(1);">Achtertuin<br>';
	domoticapagestring += 'Achter</button><br><button class="domoticabutton" id="sonoff2_2" onclick="togglesproeierrelay(2);">Achtertuin<BR>voor</button>';
	domoticapagestring += '<button class="domoticabutton" id="sonoff2_3" onclick="togglesproeierrelay(3);">-</button>';
	domoticapagestring += '</div></div><div class="domoticainfo"></div></div>';
	
	domoticapagestring += '<BR><div class="floating-box"><div class="boxtitle">Overige</div><div class="domoticabuttons"><div>';
	domoticapagestring += '<button class="domoticabutton" id="buttonmqtt2" onclick="mqtttoggle(2)">Was<br>machine</button>';
	domoticapagestring += '<button class="domoticabutton" id="buttonmqtt3" onclick="mqtttoggle(3)">Pellet<BR>Kachel</button><BR>';
	domoticapagestring += '<button class="domoticabutton" id="vaatwasser" onclick="">Vaat<BR>wasser</button>';
	domoticapagestring += '<button class="domoticabutton" id="serverrack" onclick="">Server<BR>Rack<BR>-W</button>';
	domoticapagestring += '</div></div><div class="domoticainfo"></div></div>';
	
	domoticapagestring += '<div class="floating-box"><div class="boxtitle">Stalamp Huiskamer</div><div class="domoticabuttons"><div>';
	domoticapagestring += '<button class="domoticabutton" id="buttonzwave6off" onclick="sonoffsetcolor(\'FF00000000\');">Rood</button>';
	domoticapagestring += '<button class="domoticabutton" id="buttonzwave6ww" onclick="sonoffsetcolor(\'00FF000000\');">Groen</button><br>';
	domoticapagestring += '<button class="domoticabutton" id="buttonzwave6ww" onclick="sonoffsetcolor(\'0000FF0000\');">Blauw</button>';
	domoticapagestring += '<button class="domoticabutton" id="buttonzwave6ww" onclick="sonoffsetcolor(\'5522FF0000\');">Paars</button>';
	domoticapagestring += '</div></div><div class="domoticainfo"></div></div>';
	
	domoticapagestring += '<span class="portraitbr"></span><div class="floating-box"><div class="boxtitle">Scenes</div><div class="domoticabuttons"><div>';
	domoticapagestring += '<button class="domoticabutton" id="buttonzwavescene1" onclick="zwavescene(\'avond\');">Avond</button>';
	domoticapagestring += '<button class="domoticabutton" id="buttonzwavescene2" onclick="zwavescene(\'film\');">Film</button><br>';
	domoticapagestring += '<button class="domoticabutton" id="buttonzwavescene3"" onclick="zwavescene(\'fel\');">Fel</button>';
	domoticapagestring += '<button class="domoticabutton" id="buttonzwavescene4" onclick="zwavescene(\'eten\');">Eten</button>';
	domoticapagestring += '</div></div><div class="domoticainfo"></div></div>';
	
	domoticapagestring += '<div class="floating-box"><div class="boxtitle">Scenes</div><div class="domoticabuttons"><div>';
	domoticapagestring += '<button class="domoticabutton" id="buttonzwavescene1" onclick="zwavescene(\'\');"></button>';
	domoticapagestring += '<button class="domoticabutton" id="buttonzwavescene2" onclick="zwavescene(\'\');"></button>';
	domoticapagestring += '<br><button class="domoticabutton" id="buttonzwavescene3"" onclick="zwavescene(\'lampenuit\');">Lampen<BR>Uit</button>';
	domoticapagestring += '<button class="domoticabutton" id="buttonzwavescene4" onclick="zwavescene(\'allesuit\');">Alles<BR>Uit</button>';
	domoticapagestring += '</div></div><div class="domoticainfo"></div></div>';

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

function mqttdim(id)
{
	var pretopic = "";
	switch (id)
	{
		case 1: pretopic = "home/ESP_DIMMER/";
		break;
	}
	 
	if (pretopic != "")
	{
		var currentvalue = mqttdata[pretopic + "dimvalue"];
		var newvalue = 0;
		if (currentvalue < 35) newvalue = 35;
		else if (currentvalue < 70) newvalue = 70;
		else if (currentvalue < 255) newvalue = 255;
	
		sendmqtt(pretopic+"setdimvalue",String(newvalue),0,1);
	}
}

function mqtttoggle(id)
{
	var writetopic = "";
	var readtopic = "";
	var on = "1";
	var off = "0";
	var readoff = "0";
	var retain = 1;
	switch (id)
	{
		case 1: writetopic = "home/SONOFF_TV/setrelay/0";
			readtopic = "home/SONOFF_TV/relay/0";
			readoff = "0";
		break;
		case 3: writetopic = "home/ESP_PELLETSTOVE/setpower";
			readtopic = "home/ESP_PELLETSTOVE/power/value";
			readoff = "0";
			on = "3";
			off = "0";
			retain = 0;
			sendmqtt('home/ESP_PELLETSTOVE/settemperature','21',1,retain);
		break;
		case 4: writetopic = "home/SONOFFS20_001/setrelay/0";
			readtopic = "home/SONOFFS20_001/relay/0";
			readoff = "0";
		break;
		
	}
	 
	if (writetopic != "")
	{
		var currentvalue = mqttdata[readtopic];
		var newvalue = off;
		if (currentvalue != undefined) 
		{
			if (currentvalue == readoff) newvalue = on;
		}
		else newvalue = on;
			
		sendmqtt(writetopic,newvalue,0,retain);
	}
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
		sendzwave(11,"colorswitch",1,0,"#FF99200000");
	}
	else if (mqttdata["home/zwave/"+id+"/switchmultilevel/1/level"] < 99)
	{
		sendzwave(id,"switchmultilevel",1,0,99);
		sendzwave(11,"colorswitch",1,0,"#FFAA300000");
	}
	else sendzwave(id,"switchmultilevel",1,0,0);
}

function footeron()
{
	zwavescene("avond");
}

function footeroff()
{
	zwavescene("allesuit");
}

function zwavescene(sceneid)
{
	switch (sceneid)
	{
		case "avond":
			sendzwave(2,"switchmultilevel",1,0,20); 
//			sendzwave(3,"switchbinary",1,0,1); 
//			sendzwave(4,"switchbinary",1,0,1); 
			sendzwave(3,"switchmultilevel",1,0,10);
			sendzwave(4,"switchmultilevel",1,0,25);
//			sendzwave(11,"switchmultilevel",1,0,50); 
//			sendzwave(11,"colorswitch",1,0,"#FF88200000");
			sendmqtt("home/ESP_DIMMER/setdimvalue","40",0,1);
			sendmqtt("home/SONOFF_COFFEELAMP/setrelay/0","1",0,1);
			sendmqtt("home/SONOFFS20_001/setrelay/0","1",0,1);
			sendmqtt("home/SONOFF_BULB/setcolor","FF00008800",0,1);
			sendmqtt("home/SONOFF_TV/setrelay/0","1",0,1);
		break;
		case "eten":
			sendzwave(2,"switchmultilevel",1,0,20); 
//			sendzwave(3,"switchbinary",1,0,1); 
			//sendzwave(4,"switchbinary",1,0,1); 
			sendzwave(3,"switchmultilevel",1,0,60);
			sendzwave(4,"switchmultilevel",1,0,25);
//			sendzwave(11,"switchmultilevel",1,0,50); 
//			sendzwave(11,"colorswitch",1,0,"#FF88200000");
			sendmqtt("home/ESP_DIMMER/setdimvalue","40",0,1);
			sendmqtt("home/SONOFF_COFFEELAMP/setrelay/0","1",0,1);
			sendmqtt("home/SONOFF_BULB/setcolor","FF00008800",0,1);
			sendmqtt("home/SONOFF_TV/setrelay/0","1",0,1);
			sendmqtt("home/SONOFFS20_001/setrelay/0","1",0,1);
		break;
		case "film":
			sendzwave(2,"switchmultilevel",1,0,10);
//			sendzwave(3,"switchbinary",1,0,0); 
//			sendzwave(4,"switchbinary",1,0,1); 
			sendzwave(3,"switchmultilevel",1,0,0); 
			sendzwave(4,"switchmultilevel",1,0,10); 
//			sendzwave(11,"colorswitch",1,0,"#FF88180000");
//			sendzwave(11,"switchmultilevel",1,0,1);
			sendmqtt("home/SONOFF_BULB/setcolor","3300001100",0,1);
			sendmqtt("home/SONOFF_COFFEELAMP/setrelay/0","1",0,1);
			sendmqtt("home/ESP_DIMMER/setdimvalue","30",0,1);
			sendmqtt("home/SONOFF_TV/setrelay/0","1",0,1);
			sendmqtt("home/SONOFFS20_001/setrelay/0","0",0,1);
		break
		case "fel":
			sendzwave(2,"switchmultilevel",1,0,99);
//			sendzwave(3,"switchbinary",1,0,1); 
//			sendzwave(4,"switchbinary",1,0,1); 
			sendzwave(3,"switchmultilevel",1,0,99); 
			sendzwave(4,"switchmultilevel",1,0,99);
//			sendzwave(11,"colorswitch",1,0,"#FFAA300000");
			//sendzwave(11,"switchmultilevel",1,0,99); 
			sendmqtt("home/SONOFF_COFFEELAMP/setrelay/0","1",0,1);
			sendmqtt("home/ESP_DIMMER/setdimvalue","255",0,1);
			sendmqtt("home/SONOFF_BULB/setcolor","FFFFFFFFFF",0,1);
			sendmqtt("home/SONOFF_TV/setrelay/0","1",0,1);
		break;
		case "lampenuit":
			sendzwave(2,"switchmultilevel",1,0,0); 
//			sendzwave(3,"switchbinary",1,0,0); 
			sendzwave(3,"switchmultilevel",1,0,0); 
			sendzwave(4,"switchmultilevel",1,0,0); 
//			sendzwave(11,"colorswitch",1,0,"#FF88180000");
//			sendzwave(11,"switchmultilevel",1,0,0); 
			sendmqtt("home/SONOFF_COFFEELAMP/setrelay/0","0",0,1);
			sendmqtt("home/ESP_DIMMER/setdimvalue","0",0,1);
			sendmqtt("home/SONOFF_BULB/setcolor","0000000000",0,1);
			sendmqtt("home/SONOFFS20_001/setrelay/0","0",0,1);
		break;
		case "allesuit":
			sendzwave(2,"switchmultilevel",1,0,0); 
//			sendzwave(3,"switchbinary",1,0,0); 
//			sendzwave(4,"switchbinary",1,0,0); 
			sendzwave(3,"switchmultilevel",1,0,0); 
			sendzwave(4,"switchmultilevel",1,0,0); 
//			sendzwave(11,"colorswitch",1,0,"#FF88180000");
//			sendzwave(11,"switchmultilevel",1,0,0); 
			sendmqtt("home/SONOFF_COFFEELAMP/setrelay/0","0",0,1);
			sendmqtt("home/ESP_DIMMER/setdimvalue","0",0,1);
			sendmqtt("home/SONOFF_BULB/setcolor","0000000000",0,1);
			sendmqtt("home/SONOFF_TV/setrelay/0","0",0,1);
			sendmqtt("home/ESP_PELLETSTOVE/setpower","0",0,0);
			sendmqtt("home/SONOFFS20_001/setrelay/0","0",0,1);
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
  
  client.subscribe("home/ESP_WATERMETER/status");
  client.subscribe("home/ESP_WATERMETER/water/m3");
  client.subscribe("home/ESP_WATERMETER/water/lmin");
  
  client.subscribe("home/ESP_SMARTMETER/status");
  client.subscribe("home/ESP_SMARTMETER/electricity/#");
  client.subscribe("home/ESP_SMARTMETER/gas/#");

  client.subscribe("home/ESP_GROWATT/status");
  client.subscribe("home/ESP_GROWATT/grid/#");
  client.subscribe("home/ESP_GROWATT/pv/#");

  client.subscribe("home/ESP_OPENTHERM/status");
  client.subscribe("home/ESP_OPENTHERM/boiler/#");
  client.subscribe("home/ESP_OPENTHERM/dhw/#");
  client.subscribe("home/ESP_OPENTHERM/ow/#");
  client.subscribe("home/ESP_OPENTHERM/thermostat/#");
  client.subscribe("home/ESP_OPENTHERM/burner/modulation/level");
  client.subscribe("home/ESP_OPENTHERM/ch/water/pressure");
  
  
  client.subscribe("home/watersoftner/m3");
  
  client.subscribe("home/casaan/#");

  client.subscribe("home/ESP_DUCOBOX/status");
  client.subscribe("home/ESP_DUCOBOX/1/#");
  client.subscribe("home/ESP_DUCOBOX/2/#");
  client.subscribe("home/ESP_DUCOBOX/relay/#");
  client.subscribe("home/ESP_DUCOBOX/setfan");
  
  client.subscribe("home/buienradar/actueel_weer/weerstations/weerstation/6370/#");
  client.subscribe("home/ESP_WEATHER/temperature");

  client.subscribe("home/buienradar/verwachting_vandaag/samenvatting");
  client.subscribe("home/buienradar/verwachting_vandaag/tekst");
  client.subscribe("home/buienradar/verwachting_meerdaags/+/mintemp");
  client.subscribe("home/buienradar/verwachting_meerdaags/+/maxtempmax");
  client.subscribe("home/buienradar/verwachting_meerdaags/+/windkracht");
  client.subscribe("home/buienradar/verwachting_meerdaags/+/windrichting");
  client.subscribe("home/buienradar/verwachting_meerdaags/+/icoon/@/ID");
  client.subscribe("home/zwave/status");
  client.subscribe("home/zwave/+/switchmultilevel/+/level");
  client.subscribe("home/zwave/+/sensormultilevel/+/power");
  client.subscribe("home/zwave/+/switchbinary/+/switch");
  client.subscribe("home/zwave/+/meter/+/power");
  client.subscribe("home/zwave/+/colorswitch/#");
// client.subscribe("home/temper2/#");
// client.subscribe("home/sanitasSBF70/#");
// client.subscribe("home/esp8266/#");
  client.subscribe("home/ESP_SLAAPKAMER2/dht22/#");
  client.subscribe("home/ESP_SLAAPKAMER2/mhz19/#");
  client.subscribe("home/ESP_SLAAPKAMER2/status");

  client.subscribe("home/ESP_BADKAMER/status");
  client.subscribe("home/ESP_BADKAMER/dht22/#");

  client.subscribe("home/zwave/+/meter/1/voltage");

  client.subscribe("home/ESP_TUIN/status");
  client.subscribe("home/ESP_TUIN/relay/#");

  client.subscribe("home/ESP_IRRIGATION/status");
  client.subscribe("home/ESP_IRRIGATION/relay/#");

  client.subscribe("home/ESP_DIMMER/status");
  client.subscribe("home/ESP_DIMMER/dimvalue");

  client.subscribe("home/SONOFF_PRINTER/relay/0");
  client.subscribe("home/SONOFF_COFFEELAMP/relay/0");
  client.subscribe("home/SONOFF_TV/relay/0");
  client.subscribe("home/SONOFF_TV/voltage");
  client.subscribe("home/SONOFF_TV/current");
  client.subscribe("home/SONOFF_TV/power");
  client.subscribe("home/washing_machine/relay/0");
  client.subscribe("home/washing_machine/voltage");
  client.subscribe("home/washing_machine/current");
  client.subscribe("home/washing_machine/power");
  client.subscribe("home/SONOFF_BULB/color");

  client.subscribe("home/ESP_PELLETSTOVE/phase/value");  
  client.subscribe("home/ESP_PELLETSTOVE/exhaust/temperature");  
  client.subscribe("home/ESP_PELLETSTOVE/power/value");  
  
  client.subscribe("home/SONOFFS20_001/relay/0");

  client.subscribe("home/ESP_SDM120/power");
  client.subscribe("home/ESP_SDM120/voltage");
  client.subscribe("home/ESP_SDM120/current");
  client.subscribe("home/ESP_SDM120/power/apparant");
  client.subscribe("home/ESP_SDM120/powerfactor");
  client.subscribe("home/ESP_SDM120/frequency");
  client.subscribe("home/casaan/sdm120/today/kwh");
  
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

function getweathericon(value)
{
	var icon = "";
                switch (value)
                {
                        case "a": case "j": icon = "wi-day-sunny"; break;
                        case "aa": case "jj": icon = "wi-night-clear"; break;
                        case "b": case "o": case "r": icon = "wi-day-cloudy"; break;
                        case "bb": case "oo": case "r": icon = "wi-night-alt-cloudy"; break;
                        case "c": case "p": icon = "wi-cloud"; break;
                        case "cc": case "pp": icon = "wi-cloudy"; break;
                        case "d": icon = "wi-day-fog"; break;
                        case "dd": icon = "wi-night-fog"; break;
                        case "f": case "k": icon = "wi-day-sprinkle"; break;
                        case "ff": case "kk": icon = "wi-night-sprinkle"; break;
                        case "g": icon = "wi-day-storm-showers"; break;
                        case "gg": icon = "wi-night-alt-storm-showers"; break;
                        case "h": icon = "wi-day-showers"; break;
                        case "hh": icon = "wi-night-alt-showers"; break;
                        case "i": case "u": icon = "wi-day-snow"; break;
                        case "ii": case "uu": icon = "wi-night-alt-snow"; break;
                        case "l": case "ll": case "q": case "qq": icon = "wi-rain"; break;
                        case "m": case "mm": icon = "wi-sprinkle"; break;
                        case "n": icon = "wi-day-fog"; break;
                        case "nn": icon = "wi-night-fog"; break;
                        case "n": icon = "wi-day-fog"; break;
                        case "nn": icon = "wi-night-fog"; break;
                        case "s": case "ss": icon = "wi-thunderstorm"; break;
                        case "t": case "tt": case "v": case "vv": icon = "wi-snow"; break;
                        case "w": case "ww": icon = "wi-rain-mix"; break;
                }
	return icon;
}

function getwindicon(winddirection)
{
	return "from-" + winddirection + "-deg";
}

// called when a message arrives
function onMessageArrived(message) {
  buttononcolor = "#66ff66";
  buttonsceneoncolor = "#00ccff";
  buttonoffcolor = "";
  var value = message.payloadString;
  console.log("MQTT-Received:"+message.destinationName+"="+message.payloadString);
  mqttdata[message.destinationName] = message.payloadString;
  document.getElementById('electricitybox').getElementsByClassName('boxtitle')[0].innerHTML =   
    "<font color=\""+(((dv(mqttdata["home/ESP_SMARTMETER/status"]) == "offline" || dv(mqttdata["home/ESP_SMARTMETER/status"]) == "-")) ? "#ff0000" : "#00ee00")+"\">Elektra</font>";
  document.getElementById('gasbox').getElementsByClassName('boxtitle')[0].innerHTML =   
    "<font color=\""+(((dv(mqttdata["home/ESP_SMARTMETER/status"]) == "offline" || dv(mqttdata["home/ESP_SMARTMETER/status"]) == "-")) ? "#ff0000" : "#00ee00")+"\">Gas</font>";
  document.getElementById('waterbox').getElementsByClassName('boxtitle')[0].innerHTML =   
    "<font color=\""+(((dv(mqttdata["home/ESP_WATERMETERC/status"]) == "offline") || (dv(mqttdata["home/ESP_WATERMETER/status"]) == "-")) ? "ff0000" : "#00ee00")+"\">Water</font>";
  document.getElementById('sunelectricitybox').getElementsByClassName('boxtitle')[0].innerHTML =   
    "<font color=\""+(((dv(mqttdata["home/ESP_GROWATT/status"]) == "offline" || dv(mqttdata["home/ESP_GROWATT/status"]) == "-")) ? "#ff0000" : "#00ee00")+"\">Zonnepanelen</font>";
  document.getElementById('domoticabox').getElementsByClassName('boxtitle')[0].innerHTML =   
    "<font color=\""+(((dv(mqttdata["home/zwave/status"]) == "offline" || dv(mqttdata["home/zwave/status"]) == "-")) ? "#ff0000" : "#00ee00")+"\">Domotica</font>";
 
  switch (message.destinationName)
  {
  	case "home/ESP_SMARTMETER/electricity/kw_providing":
  	case "home/ESP_SMARTMETER/electricity/kw_using":
  	/*		value = dv(Math.round((mqttdata["home/ESP_SMARTMETER/electricity/kw_using"]-mqttdata["home/ESP_SMARTMETER/electricity/kw_providing"])*1000));
	 		document.getElementById('electricitycurrent').innerHTML = value + " watt";
	 		if (value >= 0) electricitybar.value = parseInt(value);
	 		else electricitybar.value = 0;
	 		electricitybar.grow();*/
	break;
	case "home/ESP_SDM120/power":
	 		document.getElementById('electricitycurrent').innerHTML = dv(value,0) + " watt";
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
//		document.getElementById('electricityusedtoday').innerHTML = dv(parseFloat(value).toFixed(3)) + " kwh";
	break;
	case "home/casaan/sdm120/today/kwh":
		document.getElementById('electricityusedtoday').innerHTML = dv(value,3) + " kwh";
	break;
	case "home/casaan/gasmeter/today/m3":
		document.getElementById('gastoday').innerHTML = dv(value,3) + " m3";
	break;

	case "home/casaan/gasmeter/m3h":
		document.getElementById('gascurrent').innerHTML = dv(value,3) + " m3";
	 		if (value >= 0) gasbar.value = parseFloat(value);
	 		else gasbar.value = 0;
	 		gasbar.grow();
	break;


  	case "home/ESP_GROWATT/grid/watt":
                document.getElementById('sunelectricitycurrent').innerHTML = dv(value, 0) + " watt";
                sunelectricitybar.value = parseInt(value);
                sunelectricitybar.grow();
	break;
	
	
	case "home/ESP_GROWATT/grid/today/kwh":
		document.getElementById('sunelectricitytoday').innerHTML = dv(value,1) + " kwh" + "<BR>" + dv((100/18.900)*value,1) + "%";
	break;
	case "home/ESP_OPENTHERM/thermostat/temperature":
                document.getElementById('livingroomtemperaturenow').innerHTML = dv(value,1);
                temperaturebar.value = parseFloat(value).toFixed(1);
                temperaturebar.grow();
	break;
	case "home/ESP_OPENTHERM/thermostat/setpoint":
		document.getElementById('livingroomtemperatureset').innerHTML = dv(value,1);
	break;

	case "home/buienradar/actueel_weer/weerstations/weerstation/6370/windrichting":
	case "home/ESP_WEATHER/temperature":
//	case "home/buienradar/actueel_weer/weerstations/weerstation/6370/temperatuurGC":
	case "home/buienradar/actueel_weer/weerstations/weerstation/6370/windsnelheidBF":
	case "home/buienradar/actueel_weer/weerstations/weerstation/6370/luchtdruk":
	case "home/buienradar/actueel_weer/weerstations/weerstation/6370/windsnelheidMS": 
	case "home/buienradar/actueel_weer/weerstations/weerstation/6370/windrichtingGR":
		var icon = getwindicon(mqttdata["home/buienradar/actueel_weer/weerstations/weerstation/6370/windrichtingGR"]);
                document.getElementsByClassName('boxweathericon')[2].innerHTML = "<span class=\"wi wi-wind "+icon+"\"></span>"+(icon == ""?value:"");

		document.getElementsByClassName('weathertemptoday')[0].innerHTML = dv(mqttdata["home/ESP_WEATHER/temperature"],1) + " &deg;C<BR>" + dv(mqttdata["home/buienradar/actueel_weer/weerstations/weerstation/6370/windsnelheidBF"]) + " Bft - " + dv(mqttdata["home/buienradar/actueel_weer/weerstations/weerstation/6370/windrichting"]);
		document.getElementsByClassName('weathertemptoday')[1].innerHTML = dv(mqttdata["home/ESP_WEATHER/temperature"],1) + " &deg;C<BR>" + dv(mqttdata["home/buienradar/actueel_weer/weerstations/weerstation/6370/luchtdruk"]) + " mbar";
		document.getElementById("windnow").innerHTML = dv(mqttdata["home/buienradar/actueel_weer/weerstations/weerstation/6370/windsnelheidBF"]) + " Bft - " + dv(mqttdata["home/buienradar/actueel_weer/weerstations/weerstation/6370/windsnelheidMS"] * 3.6, 0) + " km/h<BR>" + dv(mqttdata["home/buienradar/actueel_weer/weerstations/weerstation/6370/windrichting"]) + " - " + dv(mqttdata["home/buienradar/actueel_weer/weerstations/weerstation/6370/windrichtingGR"]) + "&deg;"; 
	break;
	
	case "home/buienradar/actueel_weer/weerstations/weerstation/6370/icoonactueel/@/ID":
		var icon = getweathericon(value);
                document.getElementsByClassName('boxweathericon')[0].innerHTML = "<span class=\"wi "+icon+"\"></span>"+(icon == ""?value:"");
                document.getElementsByClassName('boxweathericon')[1].innerHTML = "<span class=\"wi "+icon+"\"></span>"+(icon == ""?value:"");
	break;

	case "home/buienradar/verwachting_vandaag/samenvatting":
                var element = document.getElementById('weathertext');
                element.innerHTML = dv(value);
                autochangesizes();
	break;		


	case "home/buienradar/verwachting_vandaag/tekst":
		document.getElementById("weathertextlong").innerHTML = dv(value);
	break;		

	case "home/buienradar/verwachting_meerdaags/dag-plus1/mintemp":
	case "home/buienradar/verwachting_meerdaags/dag-plus1/maxtempmax":
	case "home/buienradar/verwachting_meerdaags/dag-plus1/windkracht":
	case "home/buienradar/verwachting_meerdaags/dag-plus1/windrichting":
		var d = new Date();
		d.setDate(d.getDate()+1);
		document.getElementsByClassName('nametoday+1')[0].innerHTML=weekday[d.getDay()];
		document.getElementById("temptomorrow").innerHTML = dv(mqttdata["home/buienradar/verwachting_meerdaags/dag-plus1/mintemp"]) + " - " + dv(mqttdata["home/buienradar/verwachting_meerdaags/dag-plus1/maxtempmax"]) + " &deg;C";
		document.getElementById("temptomorrow").innerHTML += "<BR>" + dv(mqttdata["home/buienradar/verwachting_meerdaags/dag-plus1/windkracht"]) + " Bft - " + dv(mqttdata["home/buienradar/verwachting_meerdaags/dag-plus1/windrichting"]); 
	break;		
	case "home/buienradar/verwachting_meerdaags/dag-plus1/icoon/@/ID":
		var icon = getweathericon(value);
                document.getElementsByClassName('boxweathericon')[3].innerHTML = "<span class=\"wi "+icon+"\"></span>"+(icon == ""?value:"");
	break;

	case "home/buienradar/verwachting_meerdaags/dag-plus2/mintemp":
	case "home/buienradar/verwachting_meerdaags/dag-plus2/maxtempmax":
	case "home/buienradar/verwachting_meerdaags/dag-plus2/windkracht":
	case "home/buienradar/verwachting_meerdaags/dag-plus2/windrichting":
		var d = new Date();
		d.setDate(d.getDate()+2);
		document.getElementsByClassName('nametoday+2')[0].innerHTML=weekday[d.getDay()];
		document.getElementById("tempaftertomorrow").innerHTML = dv(mqttdata["home/buienradar/verwachting_meerdaags/dag-plus2/mintemp"]) + " - " + dv(mqttdata["home/buienradar/verwachting_meerdaags/dag-plus2/maxtempmax"]) + " &deg;C";
		document.getElementById("tempaftertomorrow").innerHTML += "<BR>" + dv(mqttdata["home/buienradar/verwachting_meerdaags/dag-plus2/windkracht"]) + " Bft - " + dv(mqttdata["home/buienradar/verwachting_meerdaags/dag-plus2/windrichting"]); 
	break;		
	case "home/buienradar/verwachting_meerdaags/dag-plus2/icoon/@/ID":
		var icon = getweathericon(value);
                document.getElementsByClassName('boxweathericon')[4].innerHTML = "<span class=\"wi "+icon+"\"></span>"+(icon == ""?value:"");
	break;

	case "home/buienradar/verwachting_meerdaags/dag-plus3/mintemp":
	case "home/buienradar/verwachting_meerdaags/dag-plus3/maxtempmax":
	case "home/buienradar/verwachting_meerdaags/dag-plus3/windkracht":
	case "home/buienradar/verwachting_meerdaags/dag-plus3/windrichting":
		var d = new Date();
		d.setDate(d.getDate()+3);
		document.getElementsByClassName('nametoday+3')[0].innerHTML=weekday[d.getDay()];
		document.getElementById("tempafteraftertomorrow").innerHTML = dv(mqttdata["home/buienradar/verwachting_meerdaags/dag-plus3/mintemp"]) + " - " + dv(mqttdata["home/buienradar/verwachting_meerdaags/dag-plus3/maxtempmax"]) + " &deg;C";
		document.getElementById("tempafteraftertomorrow").innerHTML += "<BR>" + dv(mqttdata["home/buienradar/verwachting_meerdaags/dag-plus3/windkracht"]) + " Bft - " + dv(mqttdata["home/buienradar/verwachting_meerdaags/dag-plus3/windrichting"]); 
	break;		
	case "home/buienradar/verwachting_meerdaags/dag-plus3/icoon/@/ID":
		var icon = getweathericon(value);
                document.getElementsByClassName('boxweathericon')[5].innerHTML = "<span class=\"wi "+icon+"\"></span>"+(icon == ""?value:"");
	break;

	case "home/buienradar/verwachting_meerdaags/dag-plus4/mintemp":
	case "home/buienradar/verwachting_meerdaags/dag-plus4/maxtempmax":
	case "home/buienradar/verwachting_meerdaags/dag-plus4/windkracht":
	case "home/buienradar/verwachting_meerdaags/dag-plus4/windrichting":
		var d = new Date();
		d.setDate(d.getDate()+4);
		document.getElementsByClassName('nametoday+4')[0].innerHTML=weekday[d.getDay()];
		document.getElementById("tempafterafteraftertomorrow").innerHTML = dv(mqttdata["home/buienradar/verwachting_meerdaags/dag-plus4/mintemp"]) + " - " + dv(mqttdata["home/buienradar/verwachting_meerdaags/dag-plus4/maxtempmax"]) + " &deg;C";
		document.getElementById("tempafterafteraftertomorrow").innerHTML += "<BR>" + dv(mqttdata["home/buienradar/verwachting_meerdaags/dag-plus4/windkracht"]) + " Bft - " + dv(mqttdata["home/buienradar/verwachting_meerdaags/dag-plus4/windrichting"]); 
	break;		
	case "home/buienradar/verwachting_meerdaags/dag-plus4/icoon/@/ID":
		var icon = getweathericon(value);
                document.getElementsByClassName('boxweathericon')[6].innerHTML = "<span class=\"wi "+icon+"\"></span>"+(icon == ""?value:"");
	break;

	
	

	case "home/ESP_WATERMETER/water/lmin":
                document.getElementById('watercurrent').innerHTML = dv(value,1) + " l/min";
                waterbar.value = value;
                waterbar.grow();
	break;
	case "home/casaan/watermeter/today/m3":
                document.getElementById('watertoday').innerHTML = dv(value,3) + " m3";
	break;


	case "home/zwave/2/switchmultilevel/1/level":
		document.getElementById('keuken_spots').style.backgroundColor = value > 0 ? buttononcolor : buttonoffcolor;
	case "home/zwave/2/sensormultilevel/1/power":
		document.getElementById('keuken_spots').innerHTML = "Spots<BR>" + dv(mqttdata["home/zwave/2/switchmultilevel/1/level"]) + "%";// - " + dv(mqttdata["home/zwave/2/sensormultilevel/1/power"]) + " watt";
	break;

	case "home/zwave/3/switchmultilevel/1/level":
		document.getElementById('eethoek_eettafel').style.backgroundColor = value > 0 ? buttononcolor : buttonoffcolor;
	case "home/zwave/3/sensormultilevel/1/power":
		document.getElementById('eethoek_eettafel').innerHTML = "Eettafel<BR>" + dv(mqttdata["home/zwave/3/switchmultilevel/1/level"]) + "%";//+" - " + dv(mqttdata["home/zwave/9/sensormultilevel/1/power"]) + " watt";
	break;


	case "home/zwave/4/switchmultilevel/1/level":
		document.getElementById('zithoek_spots').style.backgroundColor = value > 0 ? buttononcolor : buttonoffcolor;
		document.getElementById('zithoek_spots').innerHTML = "Spots<BR>" + dv(mqttdata["home/zwave/4/switchmultilevel/1/level"]) + "%";//+" - " + dv(mqttdata["home/zwave/10/sensormultilevel/1/power"]) + " watt";
	break;

	case "home/SONOFF_BULB/color":
		if (value == "0000000000") dimvalue = 0;
		else if (value == "3300001100") dimvalue = 10;
		else if (value == "FF00008800") dimvalue = 50;
		else if (value == "FFFFFFFFFF") dimvalue = 100;
		else dimvalue = 101;
		document.getElementById('eethoek_stalamp').style.backgroundColor = dimvalue > 0 ? buttononcolor : buttonoffcolor;
		document.getElementById('eethoek_stalamp').innerHTML = "Stalamp<BR>" + (dimvalue <= 100 ? dimvalue : "?") + "%";

	break;

/*	case "home/zwave/11/switchmultilevel/1/level":
		document.getElementsByClassName('domoticabutton')[2].style.backgroundColor = value > 0 ? buttononcolor : buttonoffcolor;
		document.getElementsByClassName('domoticabutton')[2].innerHTML = "Stalamp<BR>" + value + "%";
	break;

	case "home/zwave/11/colorswitch/1/color":
		document.getElementsByClassName('domoticabutton')[22].style.backgroundColor = value == "#FF00000000" ? "#FF0000" : buttonoffcolor;
		document.getElementsByClassName('domoticabutton')[23].style.backgroundColor = value == "#00FF000000" ? "#00FF00" : buttonoffcolor;
		document.getElementsByClassName('domoticabutton')[24].style.backgroundColor = value == "#0000FF0000" ? "#0000FF" : buttonoffcolor;
		document.getElementsByClassName('domoticabutton')[25].style.backgroundColor = value == "#5522FF0000"  ? "#5522FF" : buttonoffcolor;
		document.getElementsByClassName('domoticainfo')[6].innerHTML = "Color="+value;
*/	break;

	case "home/zwave/10/sensormultilevel/1/power":
//		document.getElementsByClassName('domoticainfo')[0].innerHTML = dv(mqttdata["home/zwave/10/switchmultilevel/1/level"]) + "% - " + dv(mqttdata["home/zwave/10/sensormultilevel/1/power"] + " watt");
	break;

	case "home/SONOFF_TV/relay/0":
		document.getElementById('zithoek_tv').style.backgroundColor = value == "1" ? buttononcolor : buttonoffcolor;
	break;
	case "home/SONOFFS20_001/relay/0":
		document.getElementById('zithoek_zoutlamp').style.backgroundColor = value == "1" ? buttononcolor : buttonoffcolor;
	break;
	case "home/SONOFF_TV/power":
		document.getElementById('zithoek_tv').innerHTML = "TV<BR>" + dv(Math.round(value) + "W");
	break;

	case "home/washing_machine/relay/0":
		document.getElementsByClassName('domoticabutton')[16].style.backgroundColor = value == "1" ? buttononcolor : buttonoffcolor;
	break;

	case "home/ESP_PELLETSTOVE/phase/value":
		document.getElementsByClassName('domoticabutton')[17].style.backgroundColor = value == "513" ? buttononcolor : (value != "0" ? "#ffff66" : buttonoffcolor);
	break;

	case "home/ESP_PELLETSTOVE/exhaust/temperature":
	case "home/ESP_PELLETSTOVE/power/value":
		document.getElementsByClassName('domoticabutton')[17].innerHTML = "Pellet<BR>kachel<BR>" + dv(mqttdata["home/ESP_PELLETSTOVE/power/value"]) + "-" + dv(mqttdata["home/ESP_PELLETSTOVE/exhaust/temperature"]) + "&deg;C";
	break;
	
	case "home/washing_machine/power":
		document.getElementsByClassName('domoticabutton')[16].innerHTML = "Was<BR>machine<BR>" + dv(Math.round(value) + "W");
	break;

	case "home/ESP_DIMMER/dimvalue":
		document.getElementById('zithoek_dressoir').innerHTML = "Dressoir<BR>" + dv(Math.round((100/255)*value) + "%");
		document.getElementById('zithoek_dressoir').style.backgroundColor = value != "0" ? buttononcolor : buttonoffcolor;
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


	case "home/SONOFF_COFFEELAMP/relay/0":
		document.getElementById('keuken_coffeelamp').style.backgroundColor = value != "0"   ? buttononcolor : buttonoffcolor;
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

	case "home/zwave/5/switchbinary/1/switch":
		document.getElementById('vaatwasser').style.backgroundColor = value == "true" ? buttononcolor : buttonoffcolor;
	break;
	
	case "home/zwave/5/meter/1/power":
		document.getElementById('vaatwasser').innerHTML = "Vaat<BR>wasser<BR>" + dv(mqttdata["home/zwave/5/meter/1/power"]) + "W";//+" - " + dv(mqttdata["home/zwave/9/sensormultilevel/1/power"]) + " watt";
	break;
	case "home/zwave/5/meter/1/power":

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
  if (message.destinationName.search("home/ESP_SDM120") == 0) if (currentpage == "electricity") fillElectricityPage();
  
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

function sendmqtt(topic, value, qos = 0, retain = 0)
{
	console.log("MQTT-Sending:"+topic+"="+value+" (qos="+qos+",retain="+(retain == 0 ? false:true) +")"); 
	client.send (topic, value, qos, retain == 0 ? false : true);
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
                	        titel = "<font color=\""+(dv(mqttdata["home/ESP_OPENTHERM/status"]) == "online" ? "#00ee00" : "#ff0000")+"\">CV Ketel</font>";
				label1 = "Boiler"
				value1 = mqttdata["home/ESP_OPENTHERM/boiler/temperature"] + " &deg;C";  
				overviewpagebar[key].max = 60;
				overviewpagebar[key].value = parseInt(mqttdata["home/ESP_OPENTHERM/boiler/temperature"]);
				overviewpagebar[key].grow();
				label2 = "Retourwater"
				value2 = dv(mqttdata["home/ESP_OPENTHERM/ow/ch/returnwatertemperature"],1) + " &deg;C";  
			break;  
			case 1:
                	        titel = "<font color=\""+(dv(mqttdata["home/ESP_OPENTHERM/status"]) == "online" ? "#00ee00" : "#ff0000")+"\">CV Ketel</font>";
				label1 = "Warmwater"
				value1 = dv(mqttdata["home/ESP_OPENTHERM/dhw/temperature"],1) + " &deg;C";  
				overviewpagebar[key].max = 50;
				overviewpagebar[key].min = 20;
				overviewpagebar[key].value = parseInt(value1);
				overviewpagebar[key].grow();
				label2 = "Koudwater"
				value2 = dv(mqttdata["home/ESP_OPENTHERM/ow/dcw/temperature"],1) + " &deg;C";
			break;  
			case 2:
                	        titel = "<font color=\""+(dv(mqttdata["home/ESP_OPENTHERM/status"]) == "online" ? "#00ee00" : "#ff0000")+"\">CV ketel</font>";
				label1 = "Vlam"
				value1 = mqttdata["home/ESP_OPENTHERM/burner/modulation/level"] + " %";  
				overviewpagebar[key].max = 100;
				overviewpagebar[key].value = parseInt(mqttdata["home/ESP_OPENTHERM/burner/modulation/level"]);
				overviewpagebar[key].grow();
				label2 = "CV Druk"
				value2 = dv(mqttdata["home/ESP_OPENTHERM/ch/water/pressure"],1) + " bar";
			break;  
			case 3:

                	        titel = "<font color=\""+(dv(mqttdata["home/ESP_OPENTHERM/status"]) != "offline" && dv(mqttdata["home/ESP_OPENTHERM/status"]) != "" ? "#00ee00" : "#ff0000")+"\">Thermostaat</font>";
				label1 = "Water Instelling"
				value1 = dv(mqttdata["home/ESP_OPENTHERM/thermostat/ch/water/setpoint"],1) + " &deg;C";    
				overviewpagebar[key].max = 60;
				overviewpagebar[key].value = parseInt(mqttdata["home/ESP_OPENTHERM/thermostat/ch/water/setpoint"]);
				overviewpagebar[key].grow();
				label2 = "Ruimte &Delta;T"
				value2 = parseFloat(mqttdata["home/ESP_OPENTHERM/thermostat/temperature"] - mqttdata["home/ESP_OPENTHERM/thermostat/setpoint"]).toFixed(1);
			break;
			case 4:
                	        titel = "<font color=\""+(dv(mqttdata["home/ESP_DUCOBOX/status"]) != "offline" && dv(mqttdata["home/ESP_DUCOBOX/status"]) != "" ? "#00ee00" : "#ff0000")+"\">Centrale Afzuiging</font>";
				label1 = "Ventilator"
				value1 = dv(mqttdata["home/ESP_DUCOBOX/1/fanspeed"]) + " rpm";
				overviewpagebar[key].max = 2500;
				overviewpagebar[key].value = mqttdata["home/ESP_DUCOBOX/1/fanspeed"];
				overviewpagebar[key].grow();
				label2 = ""
				value2 = "";
				break;  
			case 5:
                	        titel = "<font color=\""+(dv(mqttdata["home/ESP_DUCOBOX/status"]) != "offline" && dv(mqttdata["home/ESP_DUCOBOX/status"]) != "" ? "#00ee00" : "#ff0000")+"\">Centrale Afzuiging</font>";
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
                	        titel = "<font color=\""+(dv(mqttdata["home/ESP_SLAAPKAMER2/status"]) == "online" ? "#00ee00" : "#ff0000")+"\">Klimaat Slaapkamer</font>";
                	        label1 = "CO2";
                	        value1 = dv(mqttdata["home/ESP_SLAAPKAMER2/mhz19/co2"]) + " ppm";
       	                        overviewpagebar[key].max = 1200;
       	                        overviewpagebar[key].min = 400;
               	                overviewpagebar[key].value = dv(mqttdata["home/ESP_SLAAPKAMER2/mhz19/co2"]);
                       	        overviewpagebar[key].grow();
	                        label2 = "Temperatuur"
                                value2 = dv(mqttdata["home/ESP_SLAAPKAMER2/dht22/temperature"],1) + " &deg;C";
                        break;
			case 7:
				elements[key].getElementsByClassName("boxverticalbar")[0].style = "visibility: visible;";
                	        titel = "<font color=\""+(dv(mqttdata["home/ESP_BADKAMER/status"]) == "online" ? "#00ee00" : "#ff0000")+"\">Klimaat Badkamer</font>";
                	        label1 = "Luchtvochtigheid";
                	        value1 = dv(mqttdata["home/ESP_BADKAMER/dht22/humidity"],1)  + " %";
       	                        overviewpagebar[key].max = 100;
       	                        overviewpagebar[key].min = 0;
               	                overviewpagebar[key].value = parseInt(mqttdata["home/ESP_BADKAMER/dht22/humidity"]);
                       	        overviewpagebar[key].grow();
	                        label2 = "Temperatuur"
                                value2 = dv(mqttdata["home/ESP_BADKAMER/dht22/temperature"],1) + " &deg;C";
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
	"<TR><TD>Netvermogen</TD><TD style=\"width: 50%; text-align:right\">" + mqttdata["home/ESP_GROWATT/grid/watt"] + " W</TD></TR>" + 
	"<TR><TD>Netspanning</TD><TD style=\"width: 50%; text-align:right\">" + mqttdata["home/ESP_GROWATT/grid/volt"] + " V</TD></TR>" + 
	"<TR><TD>Frequentie</TD><TD style=\"width: 50%; text-align:right\">" + mqttdata["home/ESP_GROWATT/grid/frequency"] + " Hz</TD></TR>" + 
	"<TR><TD>PVvermogen</TD><TD style=\"width: 50%; text-align:right\">" + mqttdata["home/ESP_GROWATT/pv/watt"] + " W</TD></TR>" + 
	"<TR><TD>PVspanning</TD><TD style=\"width: 50%; text-align:right\">" + mqttdata["home/ESP_GROWATT/pv/1/volt"] + " V</TD></TR>" + 
	"</TABLE>";
}


function dv(value, precision = 0)
{
  if (typeof value == 'undefined') return "-";
  if (isNaN(value))
  {
  	if ((value == null) || (value == "") || (value == "NaN")) return "-";
	  else return value;
  }
  else
  {
        console.log ("VALUE="+value);
  	if (value == null) return "-";
	return parseFloat(value).toFixed(precision);
  }
}

function fillElectricityPage()
{
	fillOverviewPage("electricitymeter");
	elements = document.getElementById("overviewpage").getElementsByClassName("floating-box");
	elements[7].getElementsByClassName("boxtoptext")[0].innerHTML = 
	"<TABLE CLASS=\"infobox\">" + 
	"<TH COLSPAN=2>Slimme Meter</TH>" + 
	"<TR><TD>Vermogen: </TD><TD>" + dv(mqttdata["home/ESP_SMARTMETER/electricity/kw_using"]*1000 - mqttdata["home/ESP_SMARTMETER/electricity/kw_providing"]*1000, 0) + " W</TD></TR>" + 
	"<TH COLSPAN=2>SDM120</TH>"+
	"<TR><TD>Vermogen: </TD><TD>" + dv(mqttdata["home/ESP_SDM120/power"], 0) + " W</TD></TR>" + 
	"<TR><TD>Schijnvermogen: </TD><TD>" + dv(mqttdata["home/ESP_SDM120/power/apparant"], 0) + " VA</TD></TR>" + 
	"<TR><TD>Spanning: </TD><TD>" + dv(mqttdata["home/ESP_SDM120/voltage"], 0) + " V</TD></TR>" + 
	"<TR><TD>Stroom: </TD><TD>" + dv(mqttdata["home/ESP_SDM120/current"], 2) + " A</TD></TR>" + 
	"<TR><TD>Powerfactor: </TD><TD>" + dv(mqttdata["home/ESP_SDM120/powerfactor"], 2) + "</TD></TR>" + 
	"<TR><TD>Frequency: </TD><TD>" + dv(mqttdata["home/ESP_SDM120/frequency"],2) + " Hz</TD></TR>" + 
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
		titels = ["Vandaag", "Deze Maand", "Dit Jaar", "Totaal", "Gisteren", "Vorige Maand", "Vorig Jaar", "Info"];
		unit = "kwh"
		mqttitems1 = ["home/casaan/electricitymeter/today/kwh_used",  "home/casaan/electricitymeter/month/kwh_used", "home/casaan/electricitymeter/year/kwh_used", "home/ESP_SMARTMETER/electricity/kwh_used", "home/casaan/electricitymeter/yesterday/kwh_used", "home/casaan/electricitymeter/lastmonth/kwh_used", "home/casaan/electricitymeter/lastyear/kwh_used", ""];
		mqttitems2 = ["home/casaan/electricitymeter/today/kwh_provided",  "home/casaan/electricitymeter/month/kwh_provided", "home/casaan/electricitymeter/year/kwh_provided", "home/ESP_SMARTMETER/electricity/kwh_provided", "home/casaan/electricitymeter/yesterday/kwh_provided", "home/casaan/electricitymeter/lastmonth/kwh_provided", "home/casaan/electricitymeter/lastyear/kwh_provided", ""];
		label1 = "Verbruikt";
		jsonunit = "kwh_used";
		label2 = "Teruggeleverd";
		jsonunit2 = "kwh_provided";
	}
	
	if (nodename == "sunelectricity")
	{
		titels = ["Vandaag", "Deze Maand", "Dit Jaar", "Totaal", "Gisteren", "Vorige Maand", "Vorig Jaar", "Info"];
		unit = "kwh"
		mqttitems1 = ["home/ESP_GROWATT/grid/today/kwh",  "home/casaan/growatt/grid/month/kwh", "home/casaan/growatt/grid/year/kwh", "home/ESP_GROWATT/grid/total/kwh", "home/casaan/growatt/grid/yesterday/kwh", "home/casaan/growatt/grid/lastmonth/kwh", "home/casaan/growatt/grid/lastyear/kwh", ""];
		label1 = "Opgewekt";
		jsonunit = "kwh";
	}
	
	if (nodename == "gasmeter")
	{
		titels = ["Vandaag", "Deze Maand", "Dit Jaar", "Totaal", "Gisteren", "Vorige Maand", "Vorig Jaar", ""];
		unit = "m3"
		mqttitems1 = ["home/casaan/gasmeter/today/m3", "home/casaan/gasmeter/month/m3", "home/casaan/gasmeter/year/m3", "home/ESP_SMARTMETER/gas/m3",  "home/casaan/gasmeter/yesterday/m3", "home/casaan/gasmeter/lastmonth/m3", "home/casaan/gasmeter/lastyear/m3", ""];
		jsonunit = "m3";
	}
	
	if (nodename == "watermeter")
	{
		titels = ["Vandaag", "Deze Maand", "Dit Jaar", "Totaal", "Gisteren", "Vorige Maand", "Vorig Jaar", "Waterontharder Resterend"];
		unit = "m3"
		mqttitems1 = ["home/casaan/watermeter/today/m3", "home/casaan/watermeter/month/m3", "home/casaan/watermeter/year/m3", "home/ESP_WATERMETER/water/m3",  "home/casaan/watermeter/yesterday/m3", "home/casaan/watermeter/lastmonth/m3", "home/casaan/watermeter/lastyear/m3", "home/watersoftner/m3"];
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
			if (value1 != null) value1 = dv(value1,1);
			if (value1 != null) value2 = dv(value2,1);
		}
		if (nodename == "gasmeter")
		{
			if (value1 != null) value1 = dv(value1,3);
			if (value1 != null) value2 = dv(value2,3);
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
//	elements[7].getElementsByClassName("boxtitle")[0].innerHTML = "Info";
//	elements[7].getElementsByClassName("boxtoptext")[0].innerHTML = ""; 
	
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
		document.getElementsByClassName("footerbutton")[0].style.display = "flex"; 
		document.getElementsByClassName("footerbutton")[1].style.display = "flex"; 
	}
	else
	{
		document.getElementsByClassName("backbutton")[0].style.display = "flex"; 
		document.getElementsByClassName("footerbutton")[0].style.display = "none"; 
		document.getElementsByClassName("footerbutton")[1].style.display = "none"; 
	}
	previousPageName.push(pageName)
	console.log("Opening page:"+pageName);
	clearTimeout(pageTimer);
	var i;
	var x = document.getElementsByClassName("submainarea");
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none"; 
	}
	if (pageName == "time")
	{
		document.getElementById("timepage").style.display = "inline-block"; 
	}
	else if (pageName == "sunelectricity")
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
	if (pageName != "mainpage") pageTimer = setTimeout(function(){window.location='#';}, 60000);
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
