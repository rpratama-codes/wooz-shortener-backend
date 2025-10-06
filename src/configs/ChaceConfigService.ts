import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';

export const ChaceConfigService: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (config: ConfigService) => {
    const store = await redisStore({
      url: config.get<string>('REDIS_URL'),
      ttl: parseInt(config.get<string>('REDIS_CACHE_TTL')) || 30,
    });
    return {
      store: () => store,
    };
  },
  inject: [ConfigService],
};
