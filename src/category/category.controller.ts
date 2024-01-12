import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
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
    getCategories(@Request() req: any,) {
      return this.categoryService.find(req.user);
    }

    @Get("/:id")
    getCategory(@Request() req: any, @Param("id") id: string) {
      const category = this.categoryService.findOne(id, req.user)
      if(!category){
        throw new NotFoundException("Category not found")
      }
      return category
    }

    @Post()
    @ApiBody({ type: CreateCategoryDto })
     createCategory(@Request() req: any,  @Body() body: CreateCategoryDto){
       return  this.categoryService.create(req.user, body)
     }

     @Patch("/:id")
     @ApiBody({ type: CreateCategoryDto })
      updateCategory(@Request() req: any, @Param("id") id: string, @Body() body: CreateCategoryDto) {
       return this.categoryService.update(id, body, req.user);
     }
    
     @Delete("/:id")
     deleteCategory(@Request() req: any, @Param("id") id: string) {
      return this.categoryService.delete(id, req.user);
    }
}
