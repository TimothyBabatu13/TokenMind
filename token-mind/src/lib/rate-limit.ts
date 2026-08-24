import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

function getTodayKey(identifier: string) {
  const today = new Date().toISOString().slice(0, 10);
  return `usage:${identifier}:${today}`;
}

const DAYS = 60 * 60 * 24

export async function checkAndIncrementUsage(
  ip: string,
  fingerprint: string | null,
  dailyLimit: number
): Promise<{ allowed: boolean; remaining: number }> {
  const ipKey = getTodayKey(`ip:${ip}`);
  const ipCount = await redis.incr(ipKey);
  if (ipCount === 1) await redis.expire(ipKey, DAYS);

  let fpCount = 0;
  if (fingerprint) {
    const fpKey = getTodayKey(`fp:${fingerprint}`);
    fpCount = await redis.incr(fpKey);
    if (fpCount === 1) await redis.expire(fpKey, DAYS);
  }

  const allowed = ipCount <= dailyLimit && fpCount <= dailyLimit;
  return { allowed, remaining: Math.max(0, dailyLimit - Math.max(ipCount, fpCount)) };
}


export async function peekUsage(
  ip: string,
  fingerprint: string | null,
  dailyLimit: number
): Promise<{ remaining: number }> {
  const ipKey = getTodayKey(`ip:${ip}`);
  const ipCount = (await redis.get<number>(ipKey)) ?? 0;

  let fpCount = 0;
  if (fingerprint) {
    const fpKey = getTodayKey(`fp:${fingerprint}`);
    fpCount = (await redis.get<number>(fpKey)) ?? 0;
  }

  const used = Math.max(ipCount, fpCount);
  return { remaining: Math.max(0, dailyLimit - used) };
}