import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Request } from '@nestjs/common';
import { SecureEndpoint } from 'src/shared/decorators/securedendpoint.decorators';
import { Serialize } from 'src/shared/interceptors/serialize.interceptor';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { ExpenseDto } from './dtos/expense.dto';
import { ExpenseService } from './expense.service';

@Controller('expense')
@SecureEndpoint()
@Serialize(ExpenseDto)
export class ExpenseController {
    constructor(private readonly expenseService: ExpenseService){

    }

    @Get()
    getExpenses() {
      return this.expenseService.find();
    }

    @Get("/:id")
    getExpense(@Param("id") id: string) {
      const expense = this.expenseService.findOne(id)
      if(!expense){
        throw new NotFoundException("Expense not found")
      }
      return expense
    }

    @Post()
     createExpense(@Request() req: any,  @Body() body: CreateExpenseDto){
       return  this.expenseService.create(req.user, body)
     }

     @Patch("/:id")
      updateExpense(@Param("id") id: string, @Body() body: CreateExpenseDto) {
       return this.expenseService.update(id, body);
     }
    
     @Delete("/:id")
     deleteExpense(@Param("id") id: string) {
      return this.expenseService.delete(id);
    }
}
