import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { Expense } from './expense.entity';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense) private expenseRepository: Repository<Expense>,
    private categoryService: CategoryService,
    private userService: UserService,
  ) {}

  async find(): Promise<Expense[]> {
    const data = await this.expenseRepository.find();
    return data;
  }

  async findOne(id: string) {
    const expense = await this.expenseRepository.findOne({ where: { id } });
    return expense;
  }

  async create(user: User, body: CreateExpenseDto) {
    const category = await this.categoryService.findOne(body.categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const expense = this.expenseRepository.create(body);

    expense.user = user;
    expense.category = category;

    return this.expenseRepository.save(expense);
  }

  async update(id: string, body: CreateExpenseDto, user: User) {
    const category = await this.categoryService.findOne(body.categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const expense = await this.findOne(id);
    if (!expense) {
      throw new NotFoundException('expense not found');
    }

    await this.userService.removeExpense(expense.amount, {
      email: user.email,
      phoneNumber: user.phoneNumber,
    });

    Object.assign(expense, body);

    await this.userService.addExpense(expense.amount, {
      email: user.email,
      phoneNumber: user.phoneNumber,
    });

    return this.expenseRepository.save(expense);
  }

  async delete(id: string, user: User) {
    const expense = await this.findOne(id);
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }
    await this.userService.removeExpense(expense.amount, {
      email: user.email,
      phoneNumber: user.phoneNumber,
    });
    await this.expenseRepository.remove(expense);
    return 'Expense deleted successfully.';
  }
}
