// --- Test RPC properly with eth_blockNumber + eth_getBalance ---
const sanityCheckRpc = async url => {
  try {
    const provider = new ethers.JsonRpcProvider(url);

    // 1) quick block number check
    const block = await withTimeout(5000, provider.getBlockNumber());
    if (!block) return false;

    // 2) try dummy balance (address 0x0..dead)
    const dummy = '0x000000000000000000000000000000000000dEaD';
    await withTimeout(5000, provider.getBalance(dummy));

    return true;
  } catch {
    return false;
  }
};

// Replace runTests
export const runTests = async rpcUrls => {
  const urls = httpOnly(rpcUrls);
  if (!urls.length) return null;

  const candidates = [];
  for (const u of urls) {
    const ok = await sanityCheckRpc(u.url);
    if (!ok) continue;
    const latency = await testLatency(u.url);
    if (latency !== Infinity) {
      candidates.push({url: u.url, latency});
    }
  }

  candidates.sort((a, b) => a.latency - b.latency);
  return candidates[0]?.url ?? null;
};

// Then getBalanceViaBestRpc stays the same
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
