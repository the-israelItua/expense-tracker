import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Request } from '@nestjs/common';
import { SecureEndpoint } from 'src/shared/decorators/securedendpoint.decorators';
import { Serialize } from 'src/shared/interceptors/serialize.interceptor';
import { CreateIncomeDto } from './dtos/create-income.dto';
import { IncomeDto } from './dtos/income.dto';
import { IncomeService } from './income.service';

@Controller('income')
@SecureEndpoint()
@Serialize(IncomeDto)
export class IncomeController {
    constructor(private readonly incomeService: IncomeService){

    }

    @Get()
    getIncomes() {
      return this.incomeService.find();
    }

    @Get("/:id")
    getIncome(@Param("id") id: string) {
      const income = this.incomeService.findOne(id)
      if(!income){
        throw new NotFoundException("Income not found")
      }
      return income
    }

    @Post()
     createIncome(@Request() req: any,  @Body() body: CreateIncomeDto){
       return  this.incomeService.create(req.user, body)
     }

     @Patch("/:id")
      updateIncome(@Param("id") id: string, @Body() body: CreateIncomeDto) {
       return this.incomeService.update(id, body);
     }
    
     @Delete("/:id")
     deleteIncome(@Param("id") id: string) {
      return this.incomeService.delete(id);
    }
}
