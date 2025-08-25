// utils/rpcNetworks.js
import {Alert} from 'react-native';
import {getEthBalance} from './bip39-m';

// NOTE: Chainlist uses a build hash in the URL path that can change.
// If the chainlist path ever 404s, update BUILD_ID accordingly.
const BUILD_ID = '7WIYxtX7LiqfzF1Sq20DN';
const CHAINLIST_API = `https://chainlist.org/_next/data/${BUILD_ID}/chain`;

// Default chains to query
export const RPC_LIST = [1, 56, 137, 97]; // Ethereum, BNB, Polygon

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
    const start = Date.now();
    const res = await withTimeout(
      5000,
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
    if (res.ok) return end - start;
    return Infinity;
  } catch {
    return Infinity;
  }
};

/**
 * runTests(rpcUrls) -> returns { best, backups }
 * rpcUrls: array of { url, ... } or strings
 */
export const runTests = async rpcUrls => {
  const urls = httpOnly(rpcUrls);
  if (!urls.length) return {best: null, backups: []};

  const latencies = await Promise.all(urls.map(u => testLatency(u.url)));

  const scored = urls.map((u, i) => ({
    url: u.url,
    latency: latencies[i],
  }));

  const alive = scored.filter(x => x.latency !== Infinity);
  if (!alive.length) return {best: null, backups: []};

  alive.sort((a, b) => a.latency - b.latency);

  return {
    best: alive[0].url,
    backups: alive.slice(1).map(a => a.url),
  };
};

// --- Chainlist fetch (new URL structure) ---
export const fetchChainData = async chainId => {
  try {
    const res = await fetch(
      `https://chainlist.wtf/page-data/chain/${chainId}/page-data.json`,
    );
    if (!res.ok) throw new Error(`Chainlist returned ${res.status}`);
    const json = await res.json();

    // ✅ new response path
    return json?.result?.data?.chain ?? null;
  } catch (e) {
    console.error(`fetchChainData(${chainId}) failed:`, e?.message || e);
    return null;
  }
};

// Build canonical chain info (with bestRpc + backups)
export const buildChainInfo = async chainId => {
  const chain = await fetchChainData(chainId);
  if (!chain) return null;

  const rpcList = httpOnly(chain.rpc || []);
  const {best, backups} = await runTests(rpcList);

  return {
    chainId: chain.chainId,
    name: chain.name || `Chain ${chainId}`,
    symbol: chain.nativeCurrency?.symbol ?? 'ETH',
    decimals: chain.nativeCurrency?.decimals ?? 18,
    explorer: chain.explorers?.[0]?.url ?? '',
    rpcList,
    bestRpc: best,
    backups,
    chainSlug: chain.chainSlug ?? '',
    shortName: chain.shortName ?? '',
  };
};

// --- Balances ---
// Uses your bip39-m.js getEthBalance which returns formatted ether string
export const getBalanceViaBestRpc = async (address, rpcList) => {
  try {
    const {best, backups} = await runTests(rpcList);
    if (!best) return '0';

    try {
      return await getEthBalance(address, best);
    } catch (err) {
      console.warn(`Primary RPC failed, trying backup…`);
      for (const url of backups) {
        try {
          return await getEthBalance(address, url);
        } catch {}
      }
      return '0';
    }
  } catch (e) {
    console.error('getBalanceViaBestRpc error:', e?.message || e);
    return '0';
  }
};

/**
 * getAllChainBalances(address, chainIds = RPC_LIST)
 * returns: [{ chainId, name, symbol, bestRpc, backups, balance, explorer, error? }, ...]
 */
// export const getAllChainBalances = async (address, chainIds = RPC_LIST) => {
//   const results = await Promise.all(
//     chainIds.map(async id => {
//       try {
//         const info = await buildChainInfo(id);
//         if (!info) {
//           return {
//             chainId: id,
//             name: `Chain ${id}`,
//             balance: '0',
//             error: 'Failed to fetch chain info',
//           };
//         }
//         const balance = await getBalanceViaBestRpc(address, info.rpcList);
//         Alert.alert('Balance', `${balance}`);
//         return {...info, balance};
//       } catch (e) {
//         return {
//           chainId: id,
//           name: `Chain ${id}`,
//           balance: '0',
//           error: e?.message || String(e),
//         };
//       }
//     }),
//   );
//   return results;
// };

export const getAllChainBalances = async (address, chainIds = RPC_LIST) => {
  const results = await Promise.all(
    chainIds.map(async id => {
      try {
        const info = await buildChainInfo(id);
        if (!info) {
          return {
            chainId: id,
            name: `Chain ${id}`,
            balance: '0',
            error: 'Failed to fetch chain info',
          };
        }
        const balance = await getBalanceViaBestRpc(address, info.rpcList);
        return {...info, balance};
      } catch (e) {
        return {
          chainId: id,
          name: `Chain ${id}`,
          balance: '0',
          error: e?.message || String(e),
        };
      }
    }),
  );

  // ✅ Calculate total balance
  const totalBalance = results.reduce((acc, item) => {
    const val = parseFloat(item.balance || '0');
    return acc + (isNaN(val) ? 0 : val);
  }, 0);

  return {results, totalBalance: totalBalance.toString()};
};

export async function getBalance(address) {
  const data = {
    jsonrpc: '2.0',
    method: 'eth_getBalance',
    params: [address, 'latest'],
    id: 56,
  };

  const response = await fetch('https://bsc-testnet.bnbchain.org', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (result.error) {
    return 0;
  }

  // Convert hex balance (wei) to ETH
  const wei = BigInt(result.result);
  const eth = Number(wei) / 1e18;

  return eth;
}
