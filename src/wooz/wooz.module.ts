import { Global, Module } from '@nestjs/common';
import { WoozService } from './wooz.service';

@Global()
@Module({
  providers: [WoozService],
  exports: [WoozService],
})
export class WoozModule {}
