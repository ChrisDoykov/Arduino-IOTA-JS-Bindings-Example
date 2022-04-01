/*
  Auhtor: Kristiyan Doykov
  Student No.: 170780410
  Purpose: The following script displays the information about the IOTA node which
  the device is connected to and retrieves, decrypts (using AES) and parses all
  messages in the Tangle by a given index. The AES encryption type is determined 
  by the length of the key.
  Last Updated: 01 April 2022 
 */

const { ClientBuilder } = require('@iota/client');
const CryptoJS = require('crypto-js');
const { node, SENSOR_DATA_MESSAGE_INDEX, DATA_SECRET } = process.env;

const client = new ClientBuilder().node(node).build();

client.getInfo().then(console.log).catch(console.error);

const getMessagesByIndex = async (index) => {
  const messages = await client.getMessage().index(index);

  for (let message of messages) {
    const res = await client.getMessage().data(message);
    const data = Buffer.from(res.message.payload.data, 'hex').toString('utf8');

    try {
      const bytes = CryptoJS.AES.decrypt(data, DATA_SECRET);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      console.log('Data: ', decryptedData);
    } catch (e) {
      try {
        console.log('Data: ', JSON.parse(data));
      } catch (e) {
        console.log('Unrecognized hash: ', data);
      }
    }
  }
};

getMessagesByIndex(SENSOR_DATA_MESSAGE_INDEX);
