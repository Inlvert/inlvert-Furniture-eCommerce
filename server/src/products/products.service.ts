import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product, ProductDocument } from './schema/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PaginatedProductsDto } from './dto/paginate-product.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    files: Express.Multer.File[],
    additionalFiles: Express.Multer.File[],
  ): Promise<ProductDocument> {
    const newProduct = new this.productModel({
      ...createProductDto,
      images: files.map((file) => file.filename),
      additionalImages: additionalFiles.map((file) => file.filename),
    });
    return newProduct.save();
  }

  async findAll(
    page: number = 1,
    limit: number = 16,
    sort?: string,
    search?: string,
    configuration?: string,
  ): Promise<PaginatedProductsDto> {
    const skip = (page - 1) * limit;

    let sortQuery = {};

    switch (sort) {
      case 'name-asc':
        sortQuery = { name: 1 };
        break;

      case 'name-desc':
        sortQuery = { name: -1 };
        break;

      case 'date-asc':
        sortQuery = { createdAt: 1 };
        break;

      case 'date-desc':
        sortQuery = { createdAt: -1 };
        break;

      case 'price-asc':
        sortQuery = { price: 1 };
        break;

      case 'price-desc':
        sortQuery = { price: -1 };
        break;

      default:
        sortQuery = { createdAt: -1 };
    }

    const filter: any = {};

    if (search && search.trim().length >= 2) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (configuration && configuration.trim().length > 0) {
      filter.configuration = configuration;
    }

    const [items, total] = await Promise.all([
      this.productModel
        .find(filter)
        .sort(sortQuery)
        .skip(skip)
        .limit(limit)
        .exec(),

      this.productModel.countDocuments(filter).exec(),
    ]);

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

  async update(
    id: string,
    updateProductDto: CreateProductDto,
    files: Express.Multer.File[] = [],
    additionalFiles: Express.Multer.File[] = [],
  ): Promise<ProductDocument> {
    if (updateProductDto.sku) {
      const existingProduct = await this.productModel.findOne({
        sku: updateProductDto.sku,
        _id: { $ne: id },
      });

      if (existingProduct) {
        throw new BadRequestException('SKU already exists');
      }
    }

    const currentProduct = await this.productModel.findById(id);

    if (!currentProduct) {
      throw new NotFoundException('Product not found');
    }

    const updatedData: any = {
      ...updateProductDto,
    };

    if (files.length > 0) {
      updatedData.images = files.map((file) => file.filename);
    }

    if (additionalFiles.length > 0) {
      updatedData.additionalImages = additionalFiles.map(
        (file) => file.filename,
      );
    }

    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true },
    );

    return updatedProduct!;
  }

  async remove(id: string): Promise<ProductDocument> {
    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const allImages = [
      ...(product.images || []),
      ...(product.additionalImages || []),
    ];

    for (const img of allImages) {
      const filePath = path.join(process.cwd(), 'public', 'images', img);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await this.productModel.findByIdAndDelete(id);

    console.log(product);

    return product;
  }
}
