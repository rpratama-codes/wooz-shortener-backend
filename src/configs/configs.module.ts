import { Module } from '@nestjs/common';
import { throttlerConfigService } from './throttlerConfigService';

@Module({
  providers: [throttlerConfigService],
  exports: [throttlerConfigService],
})
export class ConfigsModule {}
