const rpcUrls = [
  {
    url: 'https://rpc.ankr.com/polygon',
    tracking: 'limited',
    trackingDetails:
      'For service delivery purposes, we temporarily record IP addresses to set usage limits and monitor for denial of service attacks against our infrastructure. Though we do look at high-level data around the success rate of transactions made over the blockchain RPC, we do not correlate wallet transactions made over the infrastructure to the IP address making the RPC request. Thus, we do not store, exploit, or share any information regarding Personal Identifiable Information (PII), including wallet addresses. https://www.ankr.com/blog/ankrs-ip-address-policy-and-your-privacy/',
  },
  {
    url: 'https://polygon-rpc.com',
  },
  {
    url: 'https://rpc-mainnet.matic.quiknode.pro',
    tracking: 'yes',
    trackingDetails:
      'Information about your computer hardware and software may be automatically collected by QuickNode. This information can include such details as your IP address, browser type, domain names, access times and referring website addresses.https://www.quicknode.com/privacy',
  },
  {
    url: 'https://polygon-pokt.nodies.app',
    tracking: 'none',
    trackingDetails:
      "What We Do Not Collect: User's IP address, request origin, request data. https://www.blog.pokt.network/rpc-logging-practices/",
  },
  {
    url: 'https://polygon-mainnet.public.blastapi.io',
    tracking: 'limited',
    trackingDetails:
      'All the information in our logs (log data) can only be accessed for the last 7 days at any certain time, and it is completely purged after 14 days. We do not store any user information for longer periods of time or with any other purposes than investigating potential errors and service failures. https://blastapi.io/privacy-policy',
  },
  {
    url: 'https://1rpc.io/matic',
    tracking: 'none',
    trackingDetails:
      'With the exception of data that will be public on chain, all the other metadata / data should remain private to users and other parties should not be able to access or collect it. 1RPC uses many different techniques to prevent the unnecessary collection of user privacy, which prevents tracking from RPC providers. https://docs.1rpc.io/technology/zero-tracking',
  },
  {
    url: 'https://polygon-mainnet.rpcfast.com?api_key=xbhWBI1Wkguk8SNMu1bvvLurPGLXmgwYeC4S6g2H7WdwFigZSmPWVZRxrskEQwIf',
  },
  {
    url: 'https://polygon-bor-rpc.publicnode.com',
    tracking: 'none',
    trackingDetails:
      "We do not store or track any user data with the exception of data that will be public on chain. We do not correlate wallets address's with IP's,  any data which is needed to transact is deleted after 24 hours. We also do no use any Analytics or 3rd party website tracking. https://www.publicnode.com/privacy",
  },
  {
    url: 'wss://polygon-bor-rpc.publicnode.com',
    tracking: 'none',
    trackingDetails:
      "We do not store or track any user data with the exception of data that will be public on chain. We do not correlate wallets address's with IP's,  any data which is needed to transact is deleted after 24 hours. We also do no use any Analytics or 3rd party website tracking. https://www.publicnode.com/privacy",
  },
  {
    url: 'https://polygon-mainnet.g.alchemy.com/v2/demo',
    tracking: 'yes',
    trackingDetails:
      'We may collect certain information automatically when you use our Services, such as your Internet protocol (IP) address, user settings, MAC address, cookie identifiers, mobile carrier, mobile advertising and other unique identifiers, browser or device information, location information (including approximate location derived from IP address), and Internet service provider. https://www.alchemy.com/policies/privacy-policy',
  },
  {
    url: 'https://go.getblock.io/02667b699f05444ab2c64f9bff28f027',
    tracking: 'yes',
    trackingDetails:
      'We automatically collect certain information through cookies and similar technologies when you visit, use or navigate Website. This information does not reveal your specific identity (like your name or contact information) and does not allow to identify you. However, it may include device and usage information, such as your IP address, browser and device characteristics, its type and version, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Website, information about your interaction in our emails, and other technical and statistical information. This information is primarily needed to maintain the security and operation of our Website, and for our internal analytics and reporting purposes.Specifically, as the RPC provider, we do not log and store your IP address, country, location and similar data. https://getblock.io/privacy-policy/',
  },
  {
    url: 'https://polygon.api.onfinality.io/public',
    tracking: 'limited',
    trackingDetails:
      'For the sole purpose of providing our service, we temporarily record IP addresses and origins to check against free limits, provide load balancing, prevent DOS attacks, and to determine where best to locate our nodes. We do not, and will never, correlate or link specific wallet addresses or transactions made over our infrastructure to the IP address or origin making the RPC request. After processing IP addresses, we discard the IP address value within 24 hours. Read more here: https://blog.onfinality.io/how-does-onfinality-deal-with-personal-information/',
  },
  {
    url: 'https://polygon.rpc.blxrbdn.com',
    tracking: 'yes',
    trackingDetails:
      'We may collect information that is publicly available in a blockchain when providing our services, such as: Public wallet identifier of the sender and recipient of a transaction, Unique identifier for a transaction, Date and time of a transaction, Transaction value, along with associated costs, Status of a transaction (such as whether the transaction is complete, in-progress, or resulted in an error) https://bloxroute.com/wp-content/uploads/2021/12/bloXroute-Privacy-Policy-04-01-2019-Final.pdf',
  },
  {
    url: 'https://polygon.drpc.org',
    tracking: 'none',
    trackingDetails:
      'Specific types of technical data that we may temporarily log include:IP address (only in logs for redirecting requests to the nearest RPC nodes and rate limiting at the free level, which are cleared weekly). The user ID is hidden in the temporary logs, so it is not possible to link them to a specific user.https://drpc.org/privacy-policy',
  },
  {
    url: 'https://polygon.gateway.tenderly.co',
    tracking: 'yes',
    trackingDetails:
      'Additionally, if you are an Account Member, we may collect business and transactional data about you (and your business) that accumulates over the normal course of operation regarding providing our Services. This may include transaction records, stored files, user profiles, information about collaborators, analytics data, and other metrics, as well as other types of information created or generated by your interaction with our Services. https://tenderly.co/privacy-policy',
  },
  {
    url: 'https://gateway.tenderly.co/public/polygon',
    tracking: 'yes',
    trackingDetails:
      'Additionally, if you are an Account Member, we may collect business and transactional data about you (and your business) that accumulates over the normal course of operation regarding providing our Services. This may include transaction records, stored files, user profiles, information about collaborators, analytics data, and other metrics, as well as other types of information created or generated by your interaction with our Services. https://tenderly.co/privacy-policy',
  },
  {
    url: 'https://api.zan.top/polygon-mainnet',
    tracking: 'limited',
    trackingDetails:
      'ZAN Node Service generally does not store any kind of user information (e.g. IP address, location, requst location, request data, etc.) that transits through our RPCs except for one senario ——we may track your IP address when you are using our RPCs and will delete it immediately when you stoping using our RPCs. To learn more, please review our privacy policy at https://a.zan.top/static/Privacy-Policy.pdf',
  },
  {
    url: 'https://polygon.meowrpc.com',
    tracking: 'none',
    trackingDetails:
      'With the exclusion of data that will be openly visible and available on the blockchain, MEOWRPC does not track or store any kind of user information (such as location, IP address, etc.) that passes through our RPC. For further details regarding our privacy practices, we encourage you to refer to our Privacy Policy. https://privacy.meowrpc.com',
  },
  {
    url: 'https://public.stackup.sh/api/v1/node/polygon-mainnet',
    tracking: 'limited',
    trackingDetails:
      'We collect Personal Data about you from the following categories of sources: You, When you provide such information directly to us, When you create an account or use our interactive tools and Services. When you use the Services and such information is collected automatically, Third Parties. Read more at https://www.stackup.sh/privacy',
  },
  {
    url: 'https://polygon-mainnet.gateway.tatum.io',
    tracking: 'yes',
    trackingDetails:
      "Tatum Technology s.r.o.'s policy respects your privacy regarding any information we may collect from you across our website, https://tatum.io, and other sites we own and operate. For more info, check https://tatum.io/privacy-policy .",
  },
  {
    url: 'https://polygon.rpc.subquery.network/public',
  },
  {
    url: 'https://polygon-mainnet.4everland.org/v1/37fa9972c1b1cd5fab542c7bdd4cde2f',
    tracking: 'limited',
    trackingDetails:
      'At 4EVERLAND, we are committed to protecting the privacy and security of your personal information. While we do collect certain data from our users, such as names, email addresses, account credentials, and usage information, we take robust measures to safeguard this data. We retain your personal information only for as long as your account remains active, plus an additional 6 months after closure: https://www.4everland.org/privacy-policy.',
  },
  {
    url: 'wss://polygon-mainnet.4everland.org/ws/v1/37fa9972c1b1cd5fab542c7bdd4cde2f',
    tracking: 'limited',
    trackingDetails:
      'At 4EVERLAND, we are committed to protecting the privacy and security of your personal information. While we do collect certain data from our users, such as names, email addresses, account credentials, and usage information, we take robust measures to safeguard this data. We retain your personal information only for as long as your account remains active, plus an additional 6 months after closure: https://www.4everland.org/privacy-policy.',
  },
  {
    url: 'https://endpoints.omniatech.io/v1/matic/mainnet/public',
    tracking: 'none',
    trackingDetails:
      'All the data and metadata remain private to the users. No third party is able to access, analyze or track it. OMNIA leverages different technologies and approaches to guarantee the privacy of their users, from front-running protection and private mempools, to obfuscation and random dispatching. https://blog.omniatech.io/how-omnia-handles-your-personal-data',
  },
  {
    url: 'https://polygon.lava.build',
    tracking: 'yes',
    trackingDetails:
      "We, our service providers, and our business partners may automatically log information about you, your computer or mobile device, and your interaction over time with the Service..., such as: Device data, ...your computer or mobile device's operating system type and version, manufacturer and model, browser type, screen resolution, RAM and disk size, CPU usage, device type (e.g., phone, tablet), IP address, unique identifiers (including identifiers used for advertising purposes), language settings, mobile device carrier, radio/network information (e.g., Wi-Fi, LTE, 3G), and general location information such as city, state or geographic area. https://www.lavanet.xyz/privacy-policy",
  },
  {
    url: 'https://node.histori.xyz/matic-mainnet/8ry9f6t9dct1se2hlagxnd9n2a',
    tracking: 'none',
    trackingDetails:
      'At Histori, we do not log, store, or track your IP address, country, location, or any personal data while making RPC requests and REST API calls. Learn more at: https://histori.xyz/support/privacy-policy',
  },
  {
    url: 'https://rpc.owlracle.info/poly/70d38ce1826c4a60bb2a8e05a6c8b20f',
    tracking: 'limited',
    trackingDetails:
      'For rate-limiting and to prevent abuse, we collect and store the IP address of the user making the request. This data is stored for 1 month and is not shared with any third parties. https://owlracle.info/privacy',
  },
  {
    url: 'https://polygon.therpc.io',
    tracking: 'limited',
    trackingDetails:
      'We temporarily record request method names and IP addresses for 7 days solely for service functionality, such as load balancing and DDoS protection.https://therpc.io/agreement/privacy-policy',
  },
  {
    url: 'https://rpc-mainnet.matic.network',
  },
  {
    url: 'https://matic-mainnet.chainstacklabs.com',
  },
  {
    url: 'https://rpc-mainnet.maticvigil.com',
  },
  {
    url: 'https://matic-mainnet-full-rpc.bwarelabs.com',
  },
  {
    url: 'wss://polygon.gateway.tenderly.co',
  },
  {
    url: 'wss://polygon.drpc.org',
  },
];

const testLatency = async url => {
  try {
    const start = Date.now();
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_blockNumber',
        params: [],
        id: 1,
      }),
    });
    const end = Date.now();

    if (response.ok) {
      const latency = end - start;
      console.log(`${url}: ${latency} ms`);
      return latency;
    } else {
      console.error(
        `${url}: ERROR - ${response.status} ${response.statusText}`,
      );
      return Infinity;
    }
  } catch (error) {
    console.error(`${url}: FAILED - ${error.message}`);
    return Infinity;
  }
};

const runTests = async rpcUrls => {
  console.log('Starting RPC Latency Test...');
  const results = await Promise.all(
    rpcUrls.map(urlObj => testLatency(urlObj?.url)),
  );

  console.log('\n--- Sorted Results (Lowest Latency First) ---');
  const sortedResults = rpcUrls
    .map((url, index) => ({url, latency: results[index]}))
    .sort((a, b) => a.latency - b.latency);

  sortedResults.forEach(result => {
    if (result.latency !== Infinity) {
      console.log(`✅ ${result.url}: ${result.latency} ms`);
    } else {
      console.log(`❌ ${result.url}: FAILED`);
    }
  });
};

runTests();
