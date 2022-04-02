/*
  Auhtor: Kristiyan Doykov
  Student No.: 170780410
  Purpose: The following script showcases how the IOTA client can be used
  to retrieve messages from the Tangle, demonstrated by using a random ID
  to retrieve a single message as well as a given index to retrieve all
  messages associated with that index.
  Last Updated: 01 April 2022 
 */
async function run() {
  const { ClientBuilder } = require('@iota/client');

  // client will connect to testnet by default
  const client = new ClientBuilder().build();

  const MessageFinder = client.getMessage();

  // get message data by message id (get a random message id with getTips)
  const tips = await client.getTips();

  // Get message by ID where the ID is tips[0]
  const message_data = await MessageFinder.data(tips[0]);
  // Get the metadata of that message
  const message_metadata = await MessageFinder.metadata(tips[0]);
  console.log(message_metadata);
  console.log(message_data);

  // get indexation data by index
  const message_ids = await MessageFinder.index('IOTA.RS BINDING - NODE.JS');
  for (let message_id of message_ids) {
    const message_wrapper = await MessageFinder.data(message_id);
    console.log(
      Buffer.from(message_wrapper.message.payload.data, 'hex').toString('utf8')
    );
  }
}

run();
