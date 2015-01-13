// JavaScript code for the BLE Scan example app.
function send_dev1(x_device) {
    v_date = new Date();
    v_dts = v_date.getFullYear() + "-" +
                                v_date.getMonth()+1 + "-" +
                                v_date.getDate() + " " +
                                v_date.getHours() + ":" +
                                v_date.getMinutes() + ":" +
                                v_date.getSeconds();
    v_xml = '<?xml version="1.0" encoding="UTF-8"?>'
          + '<document_root>'
          + '<custcode>TS</custcode>'
          + '<hardwareType>1</hardwareType>'
          + '<datetimesaved>' + v_dts + '</datetimesaved>'
          + '<gmtdatetime>' + v_dts + '</gmtdatetime>'
          + '<hardwareId>' + '455096622' + '</hardwareId>'
          + '<latitude>' + vg_position.coords.latitude + '</latitude>'
          + '<longitude>' + vg_position.coords.longitude + '</longitude>'
//          + '<heading>' + vg_position.coords.heading + '</heading>'
//          + '<speed>' + vg_position.coords.speed + '</speed>'
          + '<altitude>' + vg_position.coords.altitude + '</altitude>'
          + '<eventtype>1001</eventtype>'
          + '<eventcode>0</eventcode>'
          + '<messageID>100</messageID>'
          + '<RSSI>' + x_device.rssi + '</RSSI>'
          + '<DriverID>' + x_device.name + '</DriverID>'
          + '</document_root>';
    var v_xml_doc = $.parseXML(v_xml);
    alert(v_xml);
    $(function() {
        $.ajax({
            url:  "http://dev1.thing-server.com/Thingevents",
            type: "POST",
            processData: false,
            data: {xml: v_xml_doc}
        })
        .done(function(x_data) {
            v_return = x_data;
            alert(v_return);
        })
        .error(function(jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
        })
    });
}
// Application object.
var app = {};

// Device list.
app.devices = {};

// UI methods.
app.ui = {};

// Timer that updates the device list and removes inactive
// devices in case no devices are found by scan.
app.ui.updateTimer = null;

app.initialize = function()
{
	document.addEventListener('deviceready', this.onDeviceReady, false);
};

app.onDeviceReady = function()
{
	// Not used.
	// Here you can update the UI to say that
	// the device (the phone/tablet) is ready
	// to use BLE and other Cordova functions.
};

// Start the scan. Call the callback function when a device is found.
// Format:
//   callbackFun(deviceInfo, errorCode)
//   deviceInfo: address, rssi, name
//   errorCode: String
app.startScan = function(callbackFun)
{
	app.stopScan();

	evothings.ble.startScan(
		function(device)
		{
			// Report success. Sometimes an RSSI of +127 is reported.
			// We filter out these values here.
			if (device.rssi <= 0)
			{
				callbackFun(device, null);
			}
		},
		function(errorCode)
		{
			// Report error.
			callbackFun(null, errorCode);
		}
	);
};

// Stop scanning for devices.
app.stopScan = function()
{
	evothings.ble.stopScan();
};

// Called when Start Scan button is selected.
app.ui.onStartScanButton = function()
{
	app.startScan(app.ui.deviceFound);
	app.ui.displayStatus('Scanning...');
	app.ui.updateTimer = setInterval(app.ui.displayDeviceList, 500);
};

// Called when Stop Scan button is selected.
app.ui.onStopScanButton = function()
{
	app.stopScan();
	app.devices = {};
	app.ui.displayStatus('Scan Paused');
	app.ui.displayDeviceList();
	clearInterval(app.ui.updateTimer);
};

// Called when a device is found.
app.ui.deviceFound = function(device, errorCode)
{
	if (device)
	{
		// Set timestamp for device (this is used to remove
		// inactive devices).
		device.timeStamp = Date.now();

		// Insert the device into table of found devices.
		app.devices[device.address] = device;
	}
	else if (errorCode)
	{
		app.ui.displayStatus('Scan Error: ' + errorCode);
	}
};

// Display the device list.
app.ui.displayDeviceList = function()
{
	// Clear device list.
	$('#found-devices').empty();

	var timeNow = Date.now();

	$.each(app.devices, function(key, device)
	{
		// Only show devices that are updated during the last 60 seconds.
		if (device.timeStamp + 60000 > timeNow)
		{
			// Map the RSSI value to a width in percent for the indicator.
			var rssiWidth = 1; // Used when RSSI is zero or greater.
			if (device.rssi < -100) { rssiWidth = 100; }
			else if (device.rssi < 0) { rssiWidth = 100 + device.rssi; }

			// Create tag for device data.
                        if (device.advertisementData.kCBAdvDataIsConnectable)
                            v_contact = 'Is connectable';
                        else
                            v_contact = 'Is NOT connectable';
			var element = $(
				'<li>'
				+	'<strong>' + device.name + '</strong><br />'
				// Do not show address on iOS since it can be confused
				// with an iBeacon UUID.
				+	(evothings.os.isIOS() ? '' : device.address + '<br />')
				+	device.rssi + '<br />'
				+ 	'<div style="background:rgb(225,0,0);height:20px;width:'
				+ 		rssiWidth + '%;"></div>'
                                +       '<br />' + v_contact                        
				+ '</li>'
			);

			$('#found-devices').append(element);
                        send_dev1(device);
		}
	});
};

// Display a status message
app.ui.displayStatus = function(message)
{
	$('#scan-status').html(message);
};

app.initialize();