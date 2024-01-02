
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
  ) {}

   async find(): Promise<Category[]> {
    const data = await this.categoryRepository.find()
    return data
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOne({ where: {id} });
    return category
  }

  create(user: User, body: CreateCategoryDto) {
    const category = this.categoryRepository.create(body);
    category.user = user
    return this.categoryRepository.save(category);
  }

  async update(id: string, body: CreateCategoryDto) {
    const category = await this.findOne(id)
    if(!category){
      throw new NotFoundException("Category not found")
    }
    category.name = body.name
    return this.categoryRepository.save(category);
  }

  async delete(id: string) {
    const category = await this.findOne(id) 
    if(!category){
      throw new NotFoundException("Category not found")
    }
      await this.categoryRepository.remove(category);
      return "Category deleted successfully."
  }
}