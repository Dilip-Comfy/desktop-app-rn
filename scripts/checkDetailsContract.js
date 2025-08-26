import {ethers} from 'ethers';

// Connect to RPC (your custom RPC URL, e.g. Infura/Alchemy/Node)
const provider = new ethers.JsonRpcProvider('https://bsc-testnet.bnbchain.org');

// USDT contract address
const tokenAddress = '0x9f0C2781034e54439fd8B8Ba069119D3cDe1D0B6';

// ERC20 ABI fragment (only what you need)
const ERC20_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)',
];

// Create contract object
const token = new ethers.Contract(tokenAddress, ERC20_ABI, provider);

async function fetchTokenDetails() {
  const name = await token.name();
  const symbol = await token.symbol();
  const decimals = await token.decimals();
  const supply = await token.totalSupply();

  console.log({name, symbol, decimals, supply: supply.toString()});
}

fetchTokenDetails();
