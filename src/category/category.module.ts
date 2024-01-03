import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/shared/strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';

@Module({
  controllers: [CategoryController],
  imports: [
    JwtModule.register({ secret: "mySecret" }),
    TypeOrmModule.forFeature([Category]),
  ],
  providers: [
    CategoryService,
    JwtStrategy,
  ],
  exports: [JwtStrategy, CategoryService],
})
export class CategoryModule {}

