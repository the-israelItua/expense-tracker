import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/shared/strategy/jwt.strategy';
import { IncomeController } from './income.controller';
import { Income } from './income.entity';
import { IncomeService } from './income.service';

@Module({
  controllers: [IncomeController],
  imports: [
    JwtModule.register({ secret: "mySecret" }),
    TypeOrmModule.forFeature([Income]),
  ],
  providers: [
    IncomeService,
    JwtStrategy,
  ],
  exports: [JwtStrategy, IncomeService],
})

export class IncomeModule {}
