import {ethers} from 'ethers';

// Connect to RPC (your custom RPC URL, e.g. Infura/Alchemy/Node)
const provider = new ethers.JsonRpcProvider('https://bsc-testnet.bnbchain.org');
const tokenAddress = '0x9f0C2781034e54439fd8B8Ba069119D3cDe1D0B6';

// ERC20 ABI (minimal)
const ERC20_ABI = [
  'function balanceOf(address) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
];

// Create token contract instance
const token = new ethers.Contract(tokenAddress, ERC20_ABI, provider);

// Address whose balance you want
const walletAddress = '0xB5b323370d31B460676021Bf88c590eD8878Ef8e';

async function getTokenBalance() {
  const rawBalance = await token.balanceOf(walletAddress);
  const decimals = await token.decimals();
  const symbol = await token.symbol();

  const formatted = ethers.formatUnits(rawBalance, decimals);

  console.log(`${formatted} ${symbol}`);
}

getTokenBalance();
