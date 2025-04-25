export const  shortenWalletAddress = (address: string, chars = 4): string => {
      if (!address) return '';
      const prefix = address.slice(0, chars + 2);
      const suffix = address.slice(-chars);
      return `${prefix}...${suffix}`;
    }