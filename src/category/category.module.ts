import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/shared/strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { RequestContextModule } from 'nestjs-request-context';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from 'src/shared/interceptors/response.interceptor';
import { SharedModule } from 'src/shared/shared.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';

@Module({
  controllers: [CategoryController],
  imports: [
    RequestContextModule,
    CategoryModule,
    SharedModule,
    PassportModule,
    JwtModule.register({ secret: "mySecret" }),
    TypeOrmModule.forFeature([Category]),
  ],
  providers: [
    CategoryService,
    // LocalStrategy,
    JwtStrategy,
  ],
  exports: [JwtStrategy, CategoryService],
})
export class CategoryModule {}

