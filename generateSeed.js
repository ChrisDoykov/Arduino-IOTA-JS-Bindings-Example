/*
  Auhtor: Kristiyan Doykov
  Student No.: 170780410
  Purpose: The following script can be used to generate an IOTA seed, 
  mnemonic (memorable information) for the seed as well as a 
  hex-encoded seed from the original seed + mnemonic.
  Last Updated: 01 April 2022 
 */

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
