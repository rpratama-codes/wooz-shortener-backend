import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { WoozModule } from './wooz/wooz.module';
import { ShortenerModule } from './shortener/shortener.module';
import { AnalyticModule } from './analytic/analytic.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ChaceConfigService } from './configs/ChaceConfigService';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { throttlerConfigService } from './configs/throttlerConfigService';
import { ConfigsModule } from './configs/configs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRootAsync({
      useClass: throttlerConfigService,
    }),
    CacheModule.registerAsync(ChaceConfigService),
    PrismaModule,
    AuthModule,
    WoozModule,
    ShortenerModule,
    AnalyticModule,
    ConfigsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
