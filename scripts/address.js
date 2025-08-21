// scripts/address.js
import bip39 from 'bip39';
import {ethers} from 'ethers';

// ✅ Validate mnemonic
function validateMnemonic(mnemonic) {
  return bip39.validateMnemonic(mnemonic);
}

// ✅ Convert mnemonic → seed
export function mnemonicToSeed(mnemonic, password = '') {
  return bip39.mnemonicToSeedSync(mnemonic, password); // Buffer
}

// --- Pure JS randomBytes ---
function randomBytes(size) {
  let result = [];
  for (let i = 0; i < size; i++) {
    result.push(Math.floor(Math.random() * 256));
  }
  return Buffer.from(result);
}

// ✅ Create wallet from mnemonic + index
export function walletFromMnemonic(mnemonic, index = 0) {
  try {
    if (!validateMnemonic(mnemonic)) {
      throw new Error('Invalid mnemonic');
    }

    const seed = mnemonicToSeed(mnemonic);
    const hdNode = ethers.HDNodeWallet.fromSeed(seed);

    // Ethereum derivation path: m/44'/60'/0'/0/index
    const account = hdNode.derivePath(`m/44'/60'/0'/0/${index}`);

    return {
      address: account.address,
      privateKey: account.privateKey,
      mnemonic,
    };
  } catch (error) {
    console.error('Wallet generation failed:', error.message);
    return null;
  }
}

// ✅ Default to English wordlist
bip39.setDefaultWordlist('english');

// ✅ Generate 24-word mnemonic
export function generateMnemonic() {
  const entropy = randomBytes(32); // 32 bytes = 256 bits = 24 words
  return bip39.entropyToMnemonic(entropy.toString('hex'));
}

// --- Run demo if executed directly ---

(() => {
  const mnemonic = generateMnemonic();
  const wallet = walletFromMnemonic(mnemonic);
  console.log('Generated Wallet:', wallet);
})();

// 0xa1ee7e167f50d13476eb08d2aa1e7374036bdeef
// 0xA1ee7e167F50d13476Eb08d2aA1E7374036Bdeef
