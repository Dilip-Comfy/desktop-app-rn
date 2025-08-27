/* Wallet creation / mnemonic / HD derivation helpers
   Uses bip39 + ethers (ethers v6)
*/

import * as bip39 from 'bip39';
import {ethers} from 'ethers';

// Ensure english wordlist (same as you used)
bip39.setDefaultWordlist('english');

/**
 * generateMnemonic (24 words)
 */
export function generateMnemonic() {
  // bip39.generateMnemonic defaults to 128 bits (12 words).
  // To guarantee 24 words (256 bits) you can use entropy:
  const entropy = ethers.utils.hexlify(
    ethers.crypto.getRandomValues
      ? ethers.crypto.getRandomValues(new Uint8Array(32))
      : ethers.randomBytes(32),
  );
  // entropy is hex like '0x....', bip39 expects hex string without 0x
  return bip39.entropyToMnemonic(entropy.replace(/^0x/, ''));
}

/**
 * validateMnemonic
 */
export function validateMnemonic(mnemonic) {
  return bip39.validateMnemonic(mnemonic);
}

/**
 * mnemonicToSeed (synchronous)
 * returns Buffer
 */
export function mnemonicToSeed(mnemonic, password = '') {
  return bip39.mnemonicToSeedSync(mnemonic, password);
}

/**
 * Derive a single account from mnemonic using BIP44 EVM path:
 * m/44'/60'/0'/0/{index}
 * Returns {index, path, address, privateKey}
 */
export function deriveAccountFromMnemonic(mnemonic, index = 0, opts = {}) {
  if (!validateMnemonic(mnemonic)) throw new Error('Invalid mnemonic');

  const coinType = opts.coinType ?? 60; // EVM
  const accountFr = opts.account ?? 0;
  const change = opts.change ?? 0;

  const path = `m/44'/${coinType}'/${accountFr}'/${change}/${index}`;

  const seed = mnemonicToSeed(mnemonic);
  const hdNode = ethers.HDNodeWallet.fromSeed(seed);

  // Ethereum derivation path: m/44'/60'/0'/0/index
  const account = hdNode.derivePath(path);

  return {
    address: account.address,
    privateKey: account.privateKey,
    mnemonic: mnemonic,
  };
}
// For Future USe
// export function deriveAccountFromMnemonic(mnemonic, index = 0, opts = {}) {
//   if (!validateMnemonic(mnemonic)) throw new Error('Invalid mnemonic');

//   const coinType = opts.coinType ?? 60; // EVM
//   const account = opts.account ?? 0;
//   const change = opts.change ?? 0;

//   const seed = mnemonicToSeed(mnemonic);
//   // ethers.HDNodeWallet.fromSeed accepts a Buffer/Uint8Array
//   const path = `m/44'/${coinType}'/${account}'/${change}/${index}`;
//   const wallet = ethers.HDNodeWallet.fromSeed(seed, undefined, path);

//   return {
//     index,
//     path,
//     address: wallet.address,
//     privateKey: wallet.privateKey,
//   };
// }

/*
 * Derive multiple consecutive accounts from a mnemonic
 * returns array of {index, path, address, privateKey}
 */
export function deriveAccountsFromMnemonic(
  mnemonic,
  count = 1,
  startIndex = 0,
  opts = {},
) {
  if (!validateMnemonic(mnemonic)) throw new Error('Invalid mnemonic');
  if (count <= 0) throw new Error('count must be > 0');

  const seed = mnemonicToSeed(mnemonic);
  const coinType = opts.coinType ?? 60;
  const account = opts.account ?? 0;
  const change = opts.change ?? 0;

  const results = [];
  for (let i = 0; i < count; i++) {
    const idx = startIndex + i;
    const path = `m/44'/${coinType}'/${account}'/${change}/${idx}`;
    const wallet = ethers.HDNodeWallet.fromSeed(seed, undefined, path);
    results.push({
      index: idx,
      path,
      address: wallet.address,
      privateKey: wallet.privateKey,
    });
  }
  return results;
}

/**
 * Create wallet object from mnemonic (index)
 */
export function walletFromMnemonic(mnemonic, index = 0) {
  return deriveAccountFromMnemonic(mnemonic, index);
}

/**
 * Import wallet from private key
 * returns { address, privateKey }
 */
export function importWalletFromPrivateKey(privateKey) {
  const w = new ethers.Wallet(privateKey.trim());
  return {address: w.address, privateKey: w.privateKey};
}
