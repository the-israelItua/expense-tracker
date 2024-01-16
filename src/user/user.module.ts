import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { IncomeModule } from 'src/income/income.module';
import { ExpenseModule } from 'src/expense/expense.module';


@Module({
  controllers: [UserController],
  imports: [
    JwtModule,
    TypeOrmModule.forFeature([User]),
    forwardRef(() => IncomeModule),
    forwardRef(() => ExpenseModule)
  ],
  providers: [
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}

