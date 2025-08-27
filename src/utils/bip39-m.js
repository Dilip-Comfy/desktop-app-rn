// bip39-m.js
/* eslint-disable no-console */
/* Transaction & balance helpers + compatibility wrappers
   This file remains the canonical "bip39-m.js" you already use.
   It now delegates wallet derivation to walletUtils.js (non-breaking wrappers provided).
*/

import * as bip39 from 'bip39'; // kept only if you still want direct access
import {ethers} from 'ethers';
import {
  generateMnemonic as _generateMnemonic,
  validateMnemonic as _validateMnemonic,
  mnemonicToSeed as _mnemonicToSeed,
  deriveAccountFromMnemonic as _deriveAccountFromMnemonic,
  deriveAccountsFromMnemonic as _deriveAccountsFromMnemonic,
  walletFromMnemonic as _walletFromMnemonic,
  importWalletFromPrivateKey as _importWalletFromPrivateKey,
} from './walletUtils.js'; // relative path - adjust if needed

// -------------------- Provider Helper --------------------
export function getProvider(rpcUrl = 'https://eth.drpc.org') {
  return new ethers.JsonRpcProvider(rpcUrl);
}

// -------------------- ETH / Native Balance --------------------
export async function getEthBalance(address, rpcUrl) {
  const provider = getProvider(rpcUrl);
  const bal = await provider.getBalance(address);
  return ethers.formatEther(bal);
}

// -------------------- ERC20 Balance --------------------
const erc20Abi = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
];

export async function getTokenBalance(tokenAddress, walletAddress, rpcUrl) {
  const provider = getProvider(rpcUrl);
  const token = new ethers.Contract(tokenAddress, erc20Abi, provider);

  const [balance, decimals, symbol] = await Promise.all([
    token.balanceOf(walletAddress),
    token.decimals(),
    token.symbol(),
  ]);

  return {balance: ethers.formatUnits(balance, decimals), symbol};
}

// -------------------- SEND NATIVE --------------------
export async function sendNative(privateKey, to, amount, rpcUrl) {
  try {
    const provider = getProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
    const value = ethers.parseEther(amount.toString());
    const tx = await wallet.sendTransaction({to, value});
    console.warn('📤 Native tx sent:', tx.hash);
    const receipt = await tx.wait();
    console.warn('✅ Confirmed:', receipt.transactionHash);
    return receipt;
  } catch (err) {
    console.error('❌ sendNative failed:', err);
    throw err;
  }
}

// -------------------- SEND ERC20 --------------------
const ERC20_ABI = [
  'function decimals() view returns (uint8)',
  'function transfer(address to, uint amount) returns (bool)',
];

export async function sendToken(privateKey, tokenAddress, to, amount, rpcUrl) {
  try {
    const provider = getProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(tokenAddress, ERC20_ABI, wallet);

    // get decimals (if contract doesn't implement, fallback to 18)
    const decimals = await contract.decimals().catch(() => 18);
    const parsedAmount = ethers.parseUnits(amount.toString(), decimals);

    const tx = await contract.transfer(to, parsedAmount);
    console.warn('📤 Token tx sent:', tx.hash);
    const receipt = await tx.wait();
    console.warn('✅ Confirmed:', ...receipt);
    return receipt;
  } catch (err) {
    console.error('❌ sendToken failed:', err);
    throw err;
  }
}

// -------------------- Backwards-compatible Wallet Helpers --------------------
/*
  To avoid breaking existing imports, we re-export the wallet helpers
  by delegating to walletUtils.js functions above.
  If you ever want to remove these wrappers, update imports across your app.
*/

export function generateMnemonic() {
  return _generateMnemonic();
}

export function validateMnemonic(mnemonic) {
  return _validateMnemonic(mnemonic);
}

export function mnemonicToSeed(mnemonic, password = '') {
  return _mnemonicToSeed(mnemonic, password);
}

export function walletFromMnemonic(mnemonic, index = 0) {
  return _walletFromMnemonic(mnemonic, index);
}

export function importWalletFromMnemonic(mnemonic, index = 0) {
  // convenience wrapper
  return _walletFromMnemonic(mnemonic, index);
}

export function importWalletFromPrivateKey(privateKey) {
  return _importWalletFromPrivateKey(privateKey);
}

export function deriveAccountsFromMnemonic(
  mnemonic,
  count = 1,
  startIndex = 0,
  opts = {},
) {
  return _deriveAccountsFromMnemonic(mnemonic, count, startIndex, opts);
}
