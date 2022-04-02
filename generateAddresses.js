/*
  Auhtor: Kristiyan Doykov
  Student No.: 170780410
  Purpose: The following script can be used to generate IOTA addresses
  from a given seed value.
  Last Updated: 01 April 2022 
 */

async function generateAddresses() {
  const { ClientBuilder } = require('@iota/client');

  // Get the seed from environment variable
  const { IOTA_SEED_SECRET } = process.env;

  // client will connect to testnet by default
  const client = new ClientBuilder().build();

  const addresses = await client
    .getAddresses(IOTA_SEED_SECRET)
    .accountIndex(0)
    .range(0, 5)
    .get();

  console.log(addresses);

  console.log(client.isAddressValid(addresses[0]));

  console.log(await client.getAddressBalances(addresses));
}

generateAddresses();
