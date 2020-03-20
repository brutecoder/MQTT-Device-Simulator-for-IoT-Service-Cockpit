const mqtt = require('mqtt')
const fs = require("fs");
//csv to json
const csvFilePath="./data.csv"
const csv=require('csvtojson')
const timeout = ms => new Promise(res => setTimeout(res, ms))
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
})
const HOST_ADDRESS = ""; // Replace with your IoT Service instance, make sure you remove "https://" from front
const DEVICE_ALTERNATE_ID = "";
const SENSOR_ALTERNATE_ID = "";
const CAPABILITY_ALTERNATE_ID = "";
const CERTIFICATE_FILE = "./certificates/device1_certificate.pem";
const PASSPHRASE_FILE = "./certificates/device1_passphrase.txt";
//Connect to MQTT
var mqttClient = connectToMQTT()
sendDataViaMQTT();
//csvfunction
async function sendDataViaMQTT() {
const jsonArray=await csv().fromFile(csvFilePath);
for(var myKey in jsonArray) {
	  await timeout(5000)
      console.log("key:"+myKey+", value:"+jsonArray[myKey].Temperature); //Replace "Temperature" with you Variable
	  //MQTT_Push
		var lastData = {
			Temperature: jsonArray[myKey].Temperature,
			Humidity: jsonArray[myKey].Humidity,
			
		}
		var payload = {
        sensorAlternateId: SENSOR_ALTERNATE_ID,
        capabilityAlternateId: CAPABILITY_ALTERNATE_ID,
        measures: [
            lastData.Temperature, lastData.Humidity
        ]
		}
		var topicName = 'measures/' + DEVICE_ALTERNATE_ID;
		mqttClient.publish(topicName, JSON.stringify(payload), [], error => {
			if(!error) {
				console.log("Data successfully sent!");
			} else {
				console.log("An unecpected error occurred:", error);
			}
		});
		
}}
function connectToMQTT() {
    var options = {
        keepalive: 10,
        clientId: DEVICE_ALTERNATE_ID,
        clean: true,
        reconnectPeriod: 2000,
        connectTimeout: 2000,
        cert: fs.readFileSync(CERTIFICATE_FILE),
        key: fs.readFileSync(CERTIFICATE_FILE),
        passphrase: fs.readFileSync(PASSPHRASE_FILE).toString(),
        rejectUnauthorized: false
    };

    var mqttClient = mqtt.connect(`mqtts://${HOST_ADDRESS}:8883`, options);

    mqttClient.subscribe('ack/' + DEVICE_ALTERNATE_ID);
    mqttClient.on('connect', () => console.log("Connection established!"));
    mqttClient.on("error", err => console.log("Unexpected error occurred:", err));
    mqttClient.on('reconnect', () => console.log("Reconnected!"));
    mqttClient.on('close', () => console.log("Disconnected!"));
    mqttClient.on('message', (topic, msg) => console.log("Received acknowledgement for message:", msg.toString()));

    return mqttClient
}

