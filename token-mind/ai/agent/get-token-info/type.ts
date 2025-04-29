export type TokenDetails = {
    message: string,
    body: {
        mint: string;
        standard: string;
        name: string;
        symbol: string; 
        logo: string;
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
  