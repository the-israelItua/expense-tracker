import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
import { UserModule } from 'src/user/user.module';
import { ExpenseController } from './expense.controller';
import { Expense } from './expense.entity';
import { ExpenseService } from './expense.service';

@Module({
  controllers: [ExpenseController],
  imports: [
    CategoryModule,
    UserModule,
    JwtModule,
    TypeOrmModule.forFeature([Expense]),
  ],
  providers: [
    ExpenseService,
  ],
  exports: [ExpenseService],
})

export class ExpenseModule {}
