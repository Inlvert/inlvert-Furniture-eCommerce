import { Injectable, NotFoundException } from '@nestjs/common';
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

  // async findOne(id: string): Promise<ProductDocument> {
  //   const product = await this.productModel.findById(id).populate('reviews').exec();

  //   if (!product) {
  //     throw new NotFoundException('Product not found');
  //   }

  //   return product;
  // }

  async findOne(id: string) {
    const product = await this.productModel
      .findById(id)
      .populate({
        path: 'reviews',
        model: 'Review',
      })
      .lean()
      .exec();

    console.log(product);

    return product;
  }
}
