export type TokenDetails = {
    message: string,
    body: {
        mint: string;
        standard: string;
        name: string;
        symbol: string; 
        logo: string;
        price: number
        decimals: string;
        metaplex: {
            metadataUri: string;
            masterEdition: boolean;
            isMutable: boolean; 
            sellerFeeBasisPoints: number;
            updateAuthority: string;
            primarySaleHappened: number; 
        };
        fullyDilutedValue: string; 
        totalSupply: string; 
        totalSupplyFormatted: string;
        links: {
            reddit?: string;
            telegram?: string;
            twitter?: string;
            website?: string;
            moralis?: string;
    };
    description: string | null;
    isVerifiedContract: boolean;
}
};



/* New Data Type */

interface TokenExtensions {
  description: string;
  twitter: string;
  website: string;
  coingeckoId: string;
}

interface TokenData {
  address: string;
  decimals: number;
  symbol: string;
  name: string;
  marketCap: number;
  fdv: number;
  extensions: TokenExtensions;
  logoURI: string;
  liquidity: number;
  lastTradeUnixTime: number;
  lastTradeHumanTime: string;
  price: number;

  // Price history
  history1mPrice: number;
  priceChange1mPercent: number;
  history5mPrice: number;
  priceChange5mPercent: number;
  history30mPrice: number;
  priceChange30mPercent: number;
  history1hPrice: number;
  priceChange1hPercent: number;
  history2hPrice: number;
  priceChange2hPercent: number;
  history4hPrice: number;
  priceChange4hPercent: number;
  history8hPrice: number;
  priceChange8hPercent: number;
  history24hPrice: number;
  priceChange24hPercent: number;

  // Wallet activity
  uniqueWallet1m: number;
  uniqueWalletHistory1m: number;
  uniqueWallet1mChangePercent: number;
  uniqueWallet5m: number;
  uniqueWalletHistory5m: number;
  uniqueWallet5mChangePercent: number;
  uniqueWallet30m: number;
  uniqueWalletHistory30m: number;
  uniqueWallet30mChangePercent: number;
  uniqueWallet1h: number;
  uniqueWalletHistory1h: number;
  uniqueWallet1hChangePercent: number;
  uniqueWallet2h: number;
  uniqueWalletHistory2h: number;
  uniqueWallet2hChangePercent: number;
  uniqueWallet4h: number;
  uniqueWalletHistory4h: number;
  uniqueWallet4hChangePercent: number;
  uniqueWallet8h: number;
  uniqueWalletHistory8h: number;
  uniqueWallet8hChangePercent: number;
  uniqueWallet24h: number;
  uniqueWalletHistory24h: number;
  uniqueWallet24hChangePercent: number;

  // Supply & holders
  totalSupply: number;
  circulatingSupply: number;
  holder: number;

  // Trades & volumes (repeat pattern for 1m, 5m, 30m, 1h, 2h, 4h, 8h, 24h)
  trade1m: number;
  tradeHistory1m: number;
  trade1mChangePercent: number;
  sell1m: number;
  sellHistory1m: number;
  sell1mChangePercent: number;
  buy1m: number;
  buyHistory1m: number;
  buy1mChangePercent: number;
  v1m: number;
  v1mUSD: number;
  vHistory1m: number;
  vHistory1mUSD: number;
  v1mChangePercent: number;
  vBuy1m: number;
  vBuy1mUSD: number;
  vBuyHistory1m: number;
  vBuyHistory1mUSD: number;
  vBuy1mChangePercent: number;
  vSell1m: number;
  vSell1mUSD: number;
  vSellHistory1m: number;
  vSellHistory1mUSD: number;
  vSell1mChangePercent: number;

  // ... repeat the same structure for 5m, 30m, 1h, 2h, 4h, 8h, 24h

  numberMarkets: number;
  global_fees_paid: number;
  isScaledUiToken: boolean;
  multiplier: number | null;
}

export interface TokenResponse {
  data: TokenData;
  success: boolean;
  source?: string;
  fetchedAt?: string;
}
