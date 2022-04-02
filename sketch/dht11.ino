#include <DHT.h>
#include <DHT_U.h>

#define DHTPIN 7
#define DHTTYPE DHT11
#define LED 3 // The pin the LED is connected to

DHT dht(DHTPIN, DHTTYPE);

// set interval for sending messages (milliseconds)
const long interval = 8000;
unsigned long previousMillis = 0;

void setup()
{
    // Initialize serial and wait for port to open:
    Serial.begin(9600);
    while (!Serial)
    {
        ; // wait for serial port to connect. Needed for native USB port only
    }

    // This delay gives the chance to wait for a Serial Monitor without blocking if none is found
    delay(1500);

    dht.begin();

    pinMode(LED, OUTPUT); // Declare the LED as an output
}

void loop()
{
    // Record new values
    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();

    unsigned long currentMillis = millis();

    if (currentMillis - previousMillis >= interval)
    {
        digitalWrite(LED, HIGH); // Turn the LED on while recording data

        // save the last time a message was sent
        previousMillis = currentMillis;

        // Print out the recorded data to the Serial output
        Serial.print("temperature: ");
        Serial.print(temperature);
        Serial.print(",");
        Serial.print("humidity:  ");
        Serial.print(humidity);
        Serial.println();

        // Delay for the sensor to pick up data
        delay(2000);

        digitalWrite(LED, LOW); // Turn the LED off when done recording
    }
}