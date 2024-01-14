import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateIncomeDto } from './dtos/create-income.dto';
import { Income } from './income.entity';

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(Income) private incomeRepository: Repository<Income>,
    private userService: UserService,
  ) {}

  async find(user: User): Promise<Income[]> {
    const data = await this.incomeRepository.find({where:{userId: user.id}});
    return data;
  }

  async findOne(id: string, user: User) {
    const income = await this.incomeRepository.findOne({ where: { id, userId: user.id } });
    return income;
  }

  async create(user: User, body: CreateIncomeDto) {
    const income = this.incomeRepository.create(body);
    income.user = user;
    return this.incomeRepository.save(income);
  }

  async update(id: string, body: CreateIncomeDto, user: User) {
    const income = await this.findOne(id, user);
    if (!income) {
      throw new NotFoundException('Income not found');
    }

    await this.userService.removeIncome(income.amount, {
      email: user.email,
      phoneNumber: user.phoneNumber,
    });

    Object.assign(income, body);

    const data = await this.incomeRepository.save(income)

    await this.userService.addIncome(income.amount, {
      email: user.email,
      phoneNumber: user.phoneNumber,
    });

    return data;
  }

  async delete(id: string, user: User) {
    const income = await this.findOne(id, user);
    if (!income) {
      throw new NotFoundException('Income not found');
    }
    await this.incomeRepository.remove(income);
    await this.userService.removeIncome(income.amount, {
      email: user.email,
      phoneNumber: user.phoneNumber,
    });
    return 'Income deleted successfully.';
  }
}
