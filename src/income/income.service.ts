import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateIncomeDto } from './dtos/create-income.dto';
import { Income } from './income.entity';

@Injectable()
export class IncomeService {
    constructor(
        @InjectRepository(Income) private incomeRepository: Repository<Income>,
      ) {}
    
       async find(): Promise<Income[]> {
        const data = await this.incomeRepository.find()
        return data
      }
    
      async findOne(id: string) {
        const income = await this.incomeRepository.findOne({ where: {id} });
        return income
      }
    
      async create(user: User, body: CreateIncomeDto) {
        const income = this.incomeRepository.create(body);
        income.user = user
        return this.incomeRepository.save(income);
      }
    
      async update(id: string, body: CreateIncomeDto) {
        const income = await this.findOne(id)
        if(!income){
          throw new NotFoundException("Income not found")
        }

        Object.assign(income, body);


        return this.incomeRepository.save(income);
      }
    
      async delete(id: string) {
        const income = await this.findOne(id) 
        if(!income){
          throw new NotFoundException("Income not found")
        }
          await this.incomeRepository.remove(income);
          return "Income deleted successfully."
      }
}
