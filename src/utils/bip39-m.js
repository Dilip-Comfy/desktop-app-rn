// bip39-m.js
import * as bip39 from 'bip39';
import {ethers} from 'ethers';

// --- Pure JS randomBytes ---
function randomBytes(size) {
  let result = [];
  for (let i = 0; i < size; i++) {
    result.push(Math.floor(Math.random() * 256));
  }
  return Buffer.from(result);
}

// --- Init wordlist ---
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
  return bip39.mnemonicToSeedSync(mnemonic, password); // Buffer
}

// ✅ Create wallet from mnemonic
export function walletFromMnemonic(mnemonic, index = 0) {
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
    mnemonic: mnemonic,
  };
}

// ✅ Connect to provider
export function getProvider(rpcUrl = 'https://eth.drpc.org') {
  return new ethers.JsonRpcProvider(rpcUrl);
}

// ✅ Get ETH balance
export async function getEthBalance(address, rpcUrl) {
  const provider = getProvider(rpcUrl);
  const balance = await provider.getBalance(address);
  return ethers.formatEther(balance);
}

// ✅ Get ERC20 token balance
const erc20Abi = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
];

export async function getTokenBalance(tokenAddress, walletAddress, rpcUrl) {
  const provider = getProvider(rpcUrl);
  const token = new ethers.Contract(tokenAddress, erc20Abi, provider);

  const balance = await token.balanceOf(walletAddress);
  const decimals = await token.decimals();
  const symbol = await token.symbol();

  return `${ethers.formatUnits(balance, decimals)} ${symbol}`;
}

// ✅ Import wallet using mnemonic phrase
export function importWalletFromMnemonic(mnemonic, index = 0) {
  try {
    if (!validateMnemonic(mnemonic)) {
      throw new Error('Invalid mnemonic phrase');
    }
    return walletFromMnemonic(mnemonic, index);
  } catch (err) {
    console.error('❌ importWalletFromMnemonic failed:', err);
    throw err;
  }
}

// ✅ Import wallet using private key
export function importWalletFromPrivateKey(privateKey, rpcUrl = null) {
  try {
    const provider = rpcUrl ? getProvider(rpcUrl) : null;
    const wallet = new ethers.Wallet(privateKey, provider || undefined);
    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
      mnemonic: null,
    };
  } catch (err) {
    console.error('❌ importWalletFromPrivateKey failed:', err);
    throw err;
  }
}

// --- SEND NATIVE COIN (ETH, BNB, MATIC, etc.) ---
export async function sendNative(privateKey, to, amount, rpcUrl) {
  try {
    const provider = getProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    // Convert amount to wei
    const value = ethers.parseEther(amount.toString());

    const tx = await wallet.sendTransaction({
      to,
      value,
    });

    console.warn('📤 Native tx sent:', tx.hash);
    const receipt = await tx.wait();
    console.warn('✅ Confirmed:', receipt.transactionHash);
    return receipt;
  } catch (err) {
    console.error('❌ sendNative failed:', err);
    throw err;
  }
}

// --- SEND ERC20 TOKEN ---
const ERC20_ABI = [
  'function decimals() view returns (uint8)',
  'function transfer(address to, uint amount) returns (bool)',
];

export async function sendToken(privateKey, tokenAddress, to, amount, rpcUrl) {
  try {
    const provider = getProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    const contract = new ethers.Contract(tokenAddress, ERC20_ABI, wallet);

    // Get decimals to parse amount
    const decimals = await contract.decimals().catch(() => 18);
    const parsedAmount = ethers.parseUnits(amount.toString(), decimals);

    const tx = await contract.transfer(to, parsedAmount);
    console.log('📤 Token tx sent:', tx.hash);

    const receipt = await tx.wait();
    console.log('✅ Confirmed:', receipt.transactionHash);
    return receipt;
  } catch (err) {
    console.error('❌ sendToken failed:', err);
    throw err;
  }
}
