# Arduino IOTA Chrysalis Implementation

This is a simple implementation of IOTA Rust client JS bindings for the Chrysalis network update. The setup uses an Arduino Nano 33 IoT (although you can use any Arduino board with a Serial connection) with a connected DHT11 sensor and LED,
which can send to and receive AES-encrypted data from the IOTA Tangle using Indexation Payloads. This setup **does not** work on a standalone
Arduino and relies on a serial connection to a development machine, capable of running a Node.js environment.

## Requirements

**1.** Arduino board with a serial connector

**2.** Development machine with Node.js version: '10.x', '12.x', '14.x', '15.x', '16.x'

**3.** DHT11 Temperature and humidity sensor

**5.** **(OPTIONAL)** An LED

**4.** A predefined dev.env file with the following variables set:

    - NODE: e.g. https://api.lb-1.h.chrysalis-devnet.iota.cafe

    - ARDUINO_SERIAL_PORT: e.g. /dev/cu.usbmodem1201

    - SENSOR_DATA_MESSAGE_INDEX: ARDUINO TANGLE DATA

    - DATA_SECRET: your secret AES encryption key

    - IOTA_SEED_SECRET: an IOTA seed generated with the genSeed.js script

## Features

- npm run **portscan**: Find the serial port on which the Arduino communicates with your machine.
- npm run **send**: Execute the sendMessage.js script to listen to the serial port and send data to the Tangle.
- npm run **receive**: Execute the receiveMessage.js script to retrieve all messages on to the Tangle for a given index.
- npm run **genSeed**: Execute the generateSeed.js script to generate an IOTA seed.
- npm run **genAddresses**: Execute the generateAddresses.js script to generate IOTA addresses from a given seed.
- npm run **receiveExample**: Execute the getMessagesExample.js script to retrieve random messages from the Tangle.

## Installation

First install all npm modules via

```
npm install
```

Then load the `dht11.ino` sketch onto the Arduino and finally - run one of the scripts.
