import { TokenDetails, TokenResponse } from "../../ai/agent/get-token-info/type";

export function mapTokenDataToDetails(data: TokenResponse['data']): TokenDetails {
  return {
    message: "Found Information about this token. The user is shown the token, do not list it. Ask the user what they want to do with the coin.",
    body: {
      mint: data.address,
      standard: "SPL",
      name: data.name,
      symbol: data.symbol,
      logo: data.logoURI,
      decimals: String(data.decimals),
      price: data.price,
      metaplex: {
        metadataUri: "",
        masterEdition: false,
        isMutable: true,
        sellerFeeBasisPoints: 0,
        updateAuthority: "",
        primarySaleHappened: 0,
      },
      fullyDilutedValue: String(data.fdv),
      totalSupply: String(data.totalSupply),
      totalSupplyFormatted: data.totalSupply.toLocaleString(),
      links: {
        twitter: data.extensions?.twitter,
        website: data.extensions?.website,
        reddit: undefined,
        moralis: undefined,
      },
      description: data.extensions?.description || null,
      isVerifiedContract: false,
    },
  };
}