import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product, ProductDocument } from './schema/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../utils/multer';
import { PaginatedProductsDto } from './dto/paginate-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images', 5, multerConfig))
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<ProductDocument> {
    console.log('Creating product with data:', createProductDto);
    console.log('Uploaded files:', files);
    return this.productsService.create(createProductDto, files);
  }

  @Get()
  findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<PaginatedProductsDto> {
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 16;
    console.log('getAll');
    return this.productsService.findAll(pageNum, limitNum);
  }

  @Get(':id')
  findOne(@Param('id') _id: string): Promise<Product | null> {
    return this.productsService.findOne(_id);
  }
}
