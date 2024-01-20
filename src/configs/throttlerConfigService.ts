import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ThrottlerModuleOptions,
  ThrottlerOptionsFactory,
} from '@nestjs/throttler';

@Injectable()
export class throttlerConfigService implements ThrottlerOptionsFactory {
  constructor(private config: ConfigService) {}

  public async createThrottlerOptions(): Promise<ThrottlerModuleOptions> {
    return [
      {
        name: 'default',
        ttl: parseInt(this.config.get<string>('THROTTLE_TTL')),
        limit: parseInt(this.config.get<string>('THROTTLE_TTL')),
      },
    ];
  }
}
