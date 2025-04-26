import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// https://api.devnet.solana.com"

export const SOLANA_RPC ="https://api.devnet.solana.com";