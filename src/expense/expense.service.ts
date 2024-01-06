import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/category.entity';
import { CategoryService } from 'src/category/category.service';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { Expense } from './expense.entity';

@Injectable()
export class ExpenseService {
    constructor(
        @InjectRepository(Expense) private expenseRepository: Repository<Expense>,
        private categoryService: CategoryService
      ) {}
    
       async find(): Promise<Expense[]> {
        const data = await this.expenseRepository.find()
        return data
      }
    
      async findOne(id: string) {
        const expense = await this.expenseRepository.findOne({ where: {id} });
        return expense
      }
    
      async create(user: User, body: CreateExpenseDto) {
        const category = await this.categoryService.findOne(body.categoryId)
        if(!category){
            throw new NotFoundException("Category not found")
        }
        const expense = this.expenseRepository.create(body);

        expense.user = user
        expense.category = category
        
        return this.expenseRepository.save(expense);
      }
    
      async update(id: string, body: CreateExpenseDto) {
        const category = await this.categoryService.findOne(body.categoryId)
        if(!category){
            throw new NotFoundException("Category not found")
        }
        const expense = await this.findOne(id)
        if(!expense){
          throw new NotFoundException("expense not found")
        }

        Object.assign(expense, body);


        return this.expenseRepository.save(expense);
      }
    
      async delete(id: string) {
        const expense = await this.findOne(id) 
        if(!expense){
          throw new NotFoundException("Expense not found")
        }
          await this.expenseRepository.remove(expense);
          return "Expense deleted successfully."
      }
}
