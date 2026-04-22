import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Compare, CompareDocument } from './schema/compare.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class CompareService {
  constructor(
    @InjectModel(Compare.name)
    private readonly compareModel: Model<CompareDocument>,
  ) {}

  async getCompareByUser(userId: string) {
    const compare = await this.compareModel.findOne({ userId }).populate({
      path: 'products',
      model: 'Product',
    });
    if (!compare) {
      return { products: [] };
    }
    return compare;
  }

  async addToCompare(userId: string, productId: string) {
    let compare = await this.compareModel.findOne({ userId });

    if (!compare) {
      compare = new this.compareModel({
        userId,
        products: [],
      });
    }

    const populatedCompare = await compare.populate('products');

    if (populatedCompare.products.length >= 4) {
      throw new BadRequestException('You can only compare up to 4 products');
    }
    if (compare.products.includes(new Types.ObjectId(productId))) {
      throw new BadRequestException('Product already in compare');
    }

    compare.products.push(new Types.ObjectId(productId));
    await compare.save();
    return compare;
  }

  async removeFromCompare(userId: string, productId: string) {
    const compare = await this.compareModel.findOne({ userId });
    if (!compare) {
      throw new BadRequestException('Compare list not found for user');
    }

    compare.products = compare.products.filter(
      (id) => id && id.toString() !== productId,
    );

    await compare.save();
    return compare;
  }
}
