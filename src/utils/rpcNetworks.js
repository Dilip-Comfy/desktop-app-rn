// utils/rpcNetworks.js
import {getEthBalance} from './bip39-m'; // <-- adjust this path to where your bip39-m.js lives

// NOTE: Chainlist uses a build hash in the URL path that can change.
// If the chainlist path ever 404s, update BUILD_ID accordingly.
const BUILD_ID = '_o8ciwP8oqaU1TN9xjy6x'; // replace if Chainlist path changes
const CHAINLIST_API = `https://chainlist.org/_next/data/${BUILD_ID}/chain`;

// Default chains to query
export const RPC_LIST = [1, 56, 137]; // Ethereum, BSC, Polygon

// --- Helpers ---
const httpOnly = (rpcArr = []) =>
  rpcArr
    .map(x => (typeof x === 'string' ? {url: x} : x))
    .filter(x => x?.url && /^https?:\/\//i.test(x.url));

const withTimeout = (ms, promise) => {
  let timer;
  const timeout = new Promise((_, rej) => {
    timer = setTimeout(() => rej(new Error('timeout')), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
};

// --- Latency test ---
export const testLatency = async url => {
  try {
    // small wrapper for endpoints that may be accessible but slow
    const start = Date.now();
    const res = await withTimeout(
      7000,
      fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_blockNumber',
          params: [],
          id: 1,
        }),
      }),
    );
    const end = Date.now();

    if (res.ok) {
      return end - start;
    }
    return Infinity;
  } catch (e) {
    // unreachable / timeout / network error
    return Infinity;
  }
};

/**
 * runTests(rpcUrls) -> returns best RPC url string or null
 * rpcUrls: array of { url, ... } or strings
 */
export const runTests = async rpcUrls => {
  const urls = httpOnly(rpcUrls);
  if (!urls.length) return null;

  const latencies = await Promise.all(urls.map(u => testLatency(u.url)));

  const best = urls
    .map((u, i) => ({url: u.url, latency: latencies[i]}))
    .sort((a, b) => a.latency - b.latency)[0];

  return best && best.latency !== Infinity ? best.url : null;
};

// --- Chainlist fetch ---
export const fetchChainData = async chainId => {
  try {
    const res = await fetch(
      `${CHAINLIST_API}/${chainId}.json?chain=${chainId}`,
    );
    if (!res.ok) {
      throw new Error(`Chainlist returned ${res.status}`);
    }
    const json = await res.json();
    return json?.pageProps?.chain ?? null;
  } catch (e) {
    console.error(`fetchChainData(${chainId}) failed:`, e?.message || e);
    return null;
  }
};

// Build canonical chain info (with bestRpc)
export const buildChainInfo = async chainId => {
  const chain = await fetchChainData(chainId);
  if (!chain) return null;

  const rpcList = httpOnly(chain.rpc || []);
  const bestRpc = await runTests(rpcList);

  return {
    chainId: chain.chainId,
    name: chain.name,
    symbol: chain.nativeCurrency?.symbol ?? 'ETH',
    decimals: chain.nativeCurrency?.decimals ?? 18,
    explorer: chain.explorers?.[0]?.url ?? '',
    rpcList,
    bestRpc,
    chainSlug: chain.chainSlug || '',
    shortName: chain.shortName || '',
  };
};

// --- Balances ---
// Uses your bip39-m.js getEthBalance which returns formatted ether string
export const getBalanceViaBestRpc = async (address, rpcList) => {
  try {
    const best = await runTests(rpcList);
    if (!best) return '0';
    return await getEthBalance(address, best);
  } catch (e) {
    console.error('getBalanceViaBestRpc error:', e?.message || e);
    return '0';
  }
};

/**
 * getAllChainBalances(address, chainIds = RPC_LIST)
 * returns: [{ chainId, name, symbol, bestRpc, balance, explorer, error? }, ...]
 */
export const getAllChainBalances = async (address, chainIds = RPC_LIST) => {
  const out = [];
  for (const id of chainIds) {
    try {
      const info = await buildChainInfo(id);
      if (!info) {
        out.push({
          chainId: id,
          name: `Chain ${id}`,
          balance: '0',
          error: 'Failed to fetch chain info',
        });
        continue;
      }
      const balance = await getBalanceViaBestRpc(address, info.rpcList);
      out.push({...info, balance});
    } catch (e) {
      out.push({
        chainId: id,
        name: `Chain ${id}`,
        balance: '0',
        error: e?.message || String(e),
      });
    }
  }
  return out;
};
