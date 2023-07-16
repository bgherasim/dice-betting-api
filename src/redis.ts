import { Redis } from "ioredis";

// Acquire a lock
export const acquireLock = async (redis: Redis, userId: number) => {

  try {
    const reply = await redis.set(`bet_lock_${userId}`, 'locked', 'EX', 30, 'NX');
    if (!reply) {
      throw new Error('Lock already acquired');
    }
  } catch (error) {
    throw new Error('Failed to aquire lock');
  }
};


// Release a lock
export const releaseLock = async (redis: Redis, userId: number) => {
  try {
    await redis.del(`bet_lock_${userId}`)
  } catch (error) {
    throw new Error('Failed to release lock');
  }
};