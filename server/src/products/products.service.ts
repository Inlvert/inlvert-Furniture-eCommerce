import { Injectable } from '@nestjs/common';
import { Product, ProductDocument } from './schema/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PaginatedProductsDto } from './dto/paginate-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    files: Express.Multer.File[],
  ): Promise<ProductDocument> {
    const newProduct = new this.productModel({
      ...createProductDto,
      images: files.map((file) => file.filename),
    });
    return newProduct.save();
  }

  async findAll(
    page: number = 1,
    limit: number = 16,
  ): Promise<PaginatedProductsDto> {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.productModel.find().skip(skip).limit(limit).exec(),
      this.productModel.countDocuments().exec(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      items,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
