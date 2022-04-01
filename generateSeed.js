const crypto = require('crypto');
const { ClientBuilder } = require('@iota/client');

const seed = crypto
  .createHash('sha256')
  .update(crypto.randomBytes(256))
  .digest('hex');

console.log('Seed: ', seed);

const client = new ClientBuilder().build();

const mnemonic = client.generateMnemonic();
console.log('Mnemonic: ', mnemonic);

const hexEncodedSeed = client.mnemonicToHexSeed(mnemonic);
console.log('Hex Encoded Seed: ', hexEncodedSeed);
