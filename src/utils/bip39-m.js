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
