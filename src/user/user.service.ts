
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindUserDto } from './dtos/find-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async find(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(body: Partial<FindUserDto>): Promise<User | undefined> {
    return this.userRepository.findOne({ where: [{ email: body.email , phoneNumber: body.phoneNumber, username: body.username}] });
  }

  create(body: CreateUserDto) {
    const user = this.userRepository.create(body);
    return this.userRepository.save(user);
  }
}