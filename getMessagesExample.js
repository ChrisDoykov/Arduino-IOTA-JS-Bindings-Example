const { SENSOR_DATA_MESSAGE_INDEX } = process.env;

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
  const message_ids = await MessageFinder.index(SENSOR_DATA_MESSAGE_INDEX);
  for (message_id of message_ids) {
    const message_wrapper = await MessageFinder.data(message_id);
    console.log(
      Buffer.from(message_wrapper.message.payload.data, 'hex').toString('utf8')
    );
  }
}

run();
