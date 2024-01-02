import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { SecureEndpoint } from 'src/shared/decorators/securedendpoint.decorators';
import { Serialize } from 'src/shared/interceptors/serialize.interceptor';
import { CategoryService } from './category.service';
import { CategoryDto } from './dtos/category.dto';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Controller('category')
@SecureEndpoint()
@Serialize(CategoryDto)
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    getCategories() {
      return this.categoryService.find();
    }

    @Get("/:id")
    getCategory(@Param("id") id: string) {
      const category = this.categoryService.findOne(id)
      if(!category){
        throw new NotFoundException("Category not found")
      }
      return category
    }

    @Post()
     createCategory(@Request() req: any,  @Body() body: CreateCategoryDto){
       return  this.categoryService.create(req.user, body)
     }

     @Patch("/:id")
      updateCategory(@Param("id") id: string, @Body() body: CreateCategoryDto) {
       return this.categoryService.update(id, body);
     }
    
     @Delete("/:id")
     deleteCategory(@Param("id") id: string) {
      return this.categoryService.delete(id);
    }
}
