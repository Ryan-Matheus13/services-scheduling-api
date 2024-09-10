import { Module } from '@nestjs/common';
import { RedisModule as NestjsRedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    NestjsRedisModule.forRoot({
      url: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
      type: 'single',
    }),
  ],
  exports: [NestjsRedisModule],
})
export class RedisModule {}
