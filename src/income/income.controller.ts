import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { SecureEndpoint } from 'src/shared/decorators/securedendpoint.decorators';
import { Serialize } from 'src/shared/interceptors/serialize.interceptor';
import { UserService } from 'src/user/user.service';
import { CreateIncomeDto } from './dtos/create-income.dto';
import { IncomeDto } from './dtos/income.dto';
import { IncomeService } from './income.service';

@Controller('income')
@SecureEndpoint()
@Serialize(IncomeDto)
export class IncomeController {
  constructor(
    private readonly incomeService: IncomeService,
    private readonly userService: UserService,
  ) {}

  @Get()
  getIncomes(@Request() req: any) {
    return this.incomeService.find(req.user);
  }

  @Get('/:id')
  getIncome(@Request() req: any,  @Param('id') id: string) {
    const income = this.incomeService.findOne(id, req.user);
    if (!income) {
      throw new NotFoundException('Income not found');
    }
    return income;
  }

  @Post()
  @ApiBody({ type: CreateIncomeDto })
  async createIncome(@Request() req: any, @Body() body: CreateIncomeDto) {
    const data =  await this.incomeService.create(req.user, body);
    await this.userService.addIncome(body.amount, {
      email: req.user.email,
      phoneNumber: req.user.phoneNumber,
    });
    return data
  }

  @Patch('/:id')
  @ApiBody({ type: CreateIncomeDto })
  updateIncome(@Request() req: any, @Param('id') id: string, @Body() body: CreateIncomeDto) {
    return this.incomeService.update(id, body, req.user);
  }

  @Delete('/:id')
  deleteIncome(@Request() req: any, @Param('id') id: string) {
    return this.incomeService.delete(id, req.user);
  }
}
