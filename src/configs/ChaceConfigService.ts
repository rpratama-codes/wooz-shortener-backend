import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';

export const ChaceConfigService: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (config: ConfigService) => {
    const store = await redisStore({
      socket: {
        host: config.get<string>('REDIS_HOST'),
        port: parseInt(config.get<string>('REDIS_PORT')),
      },
      password: config.get<string>('REDIS_PASSWORD'),
      ttl: parseInt(config.get<string>('REDIS_CACHE_TTL')) || 30,
    });
    return {
      store: () => store,
    };
  },
  inject: [ConfigService],
};
