import { Redis } from "@upstash/redis";

interface CacheOptions<T> {
  key: string;
  ttlSeconds: number;
  fetcher: () => Promise<T>;
}

const redis = Redis.fromEnv();

export const getCachedDataOrFetch = async<T> ({ fetcher, key, ttlSeconds }: CacheOptions<T>) : Promise<T> => {
    try {
        const cached = await redis.get<T>(key);
        if (cached) return cached;
    } catch (err) {
        console.error(`[cache] read failed for ${key}:`, err);
    }
    
    const fresh = await fetcher();
    
    try {
        await redis.set(key, fresh, { ex: ttlSeconds });
    } catch (err) {
        console.error(`[cache] write failed for ${key}:`, err);
    }
    
    return fresh;
}