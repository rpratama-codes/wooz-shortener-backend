import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { WoozModule } from './wooz/wooz.module';
import { ShortenerModule } from './shortener/shortener.module';
import { AnalyticModule } from './analytic/analytic.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisConfig } from './configs/redisConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.registerAsync(redisConfig),
    PrismaModule,
    AuthModule,
    WoozModule,
    ShortenerModule,
    AnalyticModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
