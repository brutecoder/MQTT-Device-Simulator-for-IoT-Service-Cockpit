# MQTT-Device-Simulator-for-IoT-Service-Cockpit
Its a simple NodeJS Tool , which uses PEM Certificate &amp; other IDs from the IOT Service Cockpit to connect to IOT Cockpit &amp; uses a CSV file as input data to simulate a MQTT Based IOT device. It can send data to your IOT Service cockpit with any desired time intervals, without any hassle of converting Certificate etc.

Steps to use this Tool are as follows :

1. Pull this REPO on you system.
2. In the "certificate" folder replace the PEM certificate with your generated PEM certificate & rename it as "device1_certificate.pem".
3. Open "device1_passphrase.txt" , and enter the secret key you got during the PEM certificate generation on IoT Service Cockpit.
4. Replace or copy paste your required CSV data in "data.csv", make sure you don't rename it to something else, keep it as "data.csv".
5. Now, time to make some changes to "csv_to_mqtt.js", as per your device. I have defined 2 fields in code for testing namely,
   temperature & humidity. 
   You , need to add your device specific fields on line 11, 12, 13, 14.
   
   const HOST_ADDRESS = ""; // Replace with your IoT Service instance
   
   const DEVICE_ALTERNATE_ID = "";
   
   const SENSOR_ALTERNATE_ID = "";
   
   const CAPABILITY_ALTERNATE_ID = "";

6. On line number 24 you will find below code:

await timeout(5000)

Replace "5000" with desired interval time 1000 = 1 seconds

7. On line number 27 you will find below code :

var lastData = {
                 
                 Temperature: jsonArray[myKey].Temperature,
                 
                 Humidity: jsonArray[myKey].Humidity,
                 
                 }                                                    
                                                      
You replace Temp & Hum or can add more required fields.

8. Final Changes to be made on line number 35 : 

measures: [

lastData.Temperature, lastData.Humidity

]

You replace Temp & Hum or can add more required fields.

Thats all , you are good to go, just save the code. Open termainal & run the code
