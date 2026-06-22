import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product, ProductDocument } from './schema/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../utils/multer';
import { PaginatedProductsDto } from './dto/paginate-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'images', maxCount: 5 },
        { name: 'additionalImages', maxCount: 5 },
      ],
      multerConfig,
    ),
  )
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles()
    files: {
      images?: Express.Multer.File[];
      additionalImages?: Express.Multer.File[];
    },
  ): Promise<ProductDocument> {
    console.log('Creating product with data:', createProductDto);
    console.log('Uploaded files:', files);
    return this.productsService.create(
      createProductDto,
      files.images || [],
      files.additionalImages || [],
    );
  }

  @Get()
  findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('sort') sort?: string,
    @Query('search') search?: string,
    @Query('configuration') configuration?: string
  ): Promise<PaginatedProductsDto> {

    // console.log("sort", sort);
    // console.log("page", page);
    // console.log("limit", limit);
    // console.log("search", search);
    // console.log("configuration", configuration);
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 16;
    return this.productsService.findAll(pageNum, limitNum, sort, search, configuration);
  }

  @Get(':id')
  findOne(@Param('id') _id: string): Promise<Product | null> {
    return this.productsService.findOne(_id);
  }

  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'images', maxCount: 5 },
        { name: 'additionalImages', maxCount: 5 },
      ],
      multerConfig,
    ),
  )
  update(
    @Param('id') _id: string,
    @Body() updateProductDto: CreateProductDto,
    @UploadedFiles()
    files: {
      images?: Express.Multer.File[];
      additionalImages?: Express.Multer.File[];
    },
  ): Promise<ProductDocument> {
    return this.productsService.update(
      _id,
      updateProductDto,
      files.images || [],
      files.additionalImages || [],
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
