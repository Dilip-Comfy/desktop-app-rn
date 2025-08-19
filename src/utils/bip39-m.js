// bip39-m.js
import * as bip39 from 'bip39';

// Pure JS randomBytes (no native deps)
function randomBytes(size) {
  let result = [];
  for (let i = 0; i < size; i++) {
    result.push(Math.floor(Math.random() * 256));
  }
  return Buffer.from(result);
}

// Force bip39 to use English wordlist
bip39.setDefaultWordlist('english');

// ✅ Generate 24-word mnemonic
export function generateMnemonic() {
  const entropy = randomBytes(32); // 32 bytes = 256 bits = 24 words
  return bip39.entropyToMnemonic(entropy.toString('hex'));
}

// ✅ Validate mnemonic
export function validateMnemonic(mnemonic) {
  return bip39.validateMnemonic(mnemonic);
}

// ✅ Convert mnemonic → seed
export function mnemonicToSeed(mnemonic, password = '') {
  return bip39.mnemonicToSeedSync(mnemonic, password); // Returns Buffer
}

// Example usage
// const mnemonic = generateMnemonic();
// console.log("Mnemonic:", mnemonic);
// console.log("Valid:", validateMnemonic(mnemonic));
// console.log("Seed:", mnemonicToSeed(mnemonic).toString('hex'));

// // bip39-m.js
// import * as bip39 from 'bip39';
// import CryptoJS from 'crypto-js';

// // Override randomBytes (bip39 needs entropy)
// function randomBytes(size) {
//   let result = [];
//   for (let i = 0; i < size; i++) {
//     result.push(Math.floor(Math.random() * 256));
//   }
//   return Buffer.from(result);
// }

// // Override bip39’s crypto dependency
// bip39.setDefaultWordlist('english');

// // Generate mnemonic
// export function generateMnemonic() {
//   const entropy = randomBytes(32); // 128-bit entropy
//   return bip39.entropyToMnemonic(entropy.toString('hex'));
// }

// // Validate mnemonic
// export function validateMnemonic(mnemonic) {
//   return bip39.validateMnemonic(mnemonic);
// }

// // Convert mnemonic -> seed
// export function mnemonicToSeed(mnemonic, password = '') {
//   return bip39.mnemonicToSeedSync(mnemonic, password); // Works in pure JS
// }
