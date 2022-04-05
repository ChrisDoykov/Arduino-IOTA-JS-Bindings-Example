/*
  Author: Kristiyan Doykov
  Student No.: 170780410
  Purpose: The following script displays the information about the IOTA node which
  the device is connected to and retrieves, decrypts (using AES) and parses all
  messages in the Tangle by a given index. The AES encryption type is determined 
  by the length of the key.
  Last Updated: 01 April 2022 
 */

const { ClientBuilder } = require('@iota/client');
const CryptoJS = require('crypto-js');

// Import ENV variables
const { NODE, SENSOR_DATA_MESSAGE_INDEX, DATA_SECRET } = process.env;

const client = new ClientBuilder().node(NODE).build();

// Get info about the node
client.getInfo().then(console.log).catch(console.error);

const getMessagesByIndex = async (index) => {
  // Get the IDs of all messages under the given index
  const messages = await client.getMessage().index(index);

  // Process each message individually
  for (let message of messages) {
    // Get the response data
    const res = await client.getMessage().data(message);
    // Convert from buffer to a UTF8 string
    const data = Buffer.from(res.message.payload.data, 'hex').toString('utf8');

    // If able to decrypt using AES(the original encryptio method) and
    // the original secret -> Log the decrypted data
    try {
      const bytes = CryptoJS.AES.decrypt(data, DATA_SECRET);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      console.log('Data: ', decryptedData);
    } catch (e) {
      try {
        // If data is in plain JSON format -> Log it directly
        console.log('Data: ', JSON.parse(data));
      } catch (e) {
        // If AES is not the encryption method and the data is not
        // in plain JSON
        console.log('Unrecognized encryption: ', data);
      }
    }
  }
};

getMessagesByIndex(SENSOR_DATA_MESSAGE_INDEX);
