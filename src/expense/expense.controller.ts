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
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { ExpenseDto } from './dtos/expense.dto';
import { ExpenseService } from './expense.service';

@Controller('expense')
@SecureEndpoint()
@Serialize(ExpenseDto)
export class ExpenseController {
  constructor(
    private readonly expenseService: ExpenseService,
    private readonly userService: UserService,
  ) {}

  @Get()
  getExpenses() {
    return this.expenseService.find();
  }

  @Get('/:id')
  getExpense(@Param('id') id: string) {
    const expense = this.expenseService.findOne(id);
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }
    return expense;
  }

  @Post()
  @ApiBody({ type: CreateExpenseDto })
  async createExpense(@Request() req: any, @Body() body: CreateExpenseDto) {
    await this.userService.addExpense(body.amount, {
      email: req.user.email,
      phoneNumber: req.user.phoneNumber,
    });
    return this.expenseService.create(req.user, body);
  }

  @Patch('/:id')
  @ApiBody({ type: CreateExpenseDto })
  updateExpense(
    @Request() req: any,
    @Param('id') id: string,
    @Body() body: CreateExpenseDto,
  ) {
    return this.expenseService.update(id, body, req.user);
  }

  @Delete('/:id')
  deleteExpense(@Request() req: any, @Param('id') id: string) {
    return this.expenseService.delete(id, req.user);
  }
}
