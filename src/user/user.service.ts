import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseService } from 'src/expense/expense.service';
import { IncomeService } from 'src/income/income.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindUserDto } from './dtos/find-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(forwardRef(() => IncomeService))
    private readonly incomeService: IncomeService,
    @Inject(forwardRef(() => ExpenseService))
    private readonly expenseService: ExpenseService,
  ) {}

  async find(): Promise<User[]> {
    return this.userRepository.find();
  }

  async fetchTransactions(user: User) {
    const incomes = await this.incomeService.find(user);
    const expenses = await this.expenseService.find(user);

    const formattedIncomes = incomes?.map((item) => {
      return {
        transactionType: 'income',
        ...item,
      };
    });

    const formattedExpenses = expenses?.map((item) => {
      return {
        transactionType: 'expense',
        ...item,
      };
    });

    const transactions = [...formattedIncomes, ...formattedExpenses].sort(
      (a, b) =>
        new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime(),
    );

    return transactions;
  }

  async findOne(body: Partial<FindUserDto>): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: [{ email: body.email, phoneNumber: body.phoneNumber }],
    });
  }

  create(body: CreateUserDto) {
    const user = this.userRepository.create(body);
    return this.userRepository.save(user);
  }

  async addIncome(amount: number, body: Partial<FindUserDto>) {
    const user = await this.findOne(body);
    user.totalIncome += amount;
    user.balance += amount;
    return this.userRepository.save(user);
  }

  async addExpense(amount: number, body: Partial<FindUserDto>) {
    const user = await this.findOne(body);
    user.totalExpenses += amount;
    user.balance -= amount;
    return this.userRepository.save(user);
  }

  async removeIncome(amount: number, body: Partial<FindUserDto>) {
    const user = await this.findOne(body);
    user.totalIncome -= amount;
    user.balance -= amount;
    return this.userRepository.save(user);
  }

  async removeExpense(amount: number, body: Partial<FindUserDto>) {
    const user = await this.findOne(body);
    user.totalExpenses -= amount;
    user.balance += amount;
    return this.userRepository.save(user);
  }
}
