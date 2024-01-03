import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
import { CategoryService } from 'src/category/category.service';
import { JwtStrategy } from 'src/shared/strategy/jwt.strategy';
import { ExpenseController } from './expense.controller';
import { Expense } from './expense.entity';
import { ExpenseService } from './expense.service';

@Module({
  controllers: [ExpenseController],
  imports: [
    CategoryModule,
    JwtModule.register({ secret: "mySecret" }),
    TypeOrmModule.forFeature([Expense]),
  ],
  providers: [
    ExpenseService,
    JwtStrategy,
  ],
  exports: [JwtStrategy, ExpenseService],
})

export class ExpenseModule {}
