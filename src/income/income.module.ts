import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { IncomeController } from './income.controller';
import { Income } from './income.entity';
import { IncomeService } from './income.service';

@Module({
  controllers: [IncomeController],
  imports: [
    JwtModule,
    TypeOrmModule.forFeature([Income]),
    UserModule
  ],
  providers: [
    IncomeService,
  ],
  exports: [ IncomeService],
})

export class IncomeModule {}
