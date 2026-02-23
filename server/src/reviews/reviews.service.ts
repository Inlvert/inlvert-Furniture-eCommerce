import { Injectable } from '@nestjs/common';
import { Review, ReviewDocument } from './schema/reviews.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateReviewDto } from './dto/create-reviews.dto';
import { Product, ProductDocument } from 'src/products/schema/product.schema';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<ReviewDocument> {
    const review = await this.reviewModel.create({
      ...createReviewDto,
      productId: new Types.ObjectId(createReviewDto.productId),
    });

    const reviews = await this.reviewModel.find({
      productId: review.productId,
    });

    const reviewsCount = reviews.length;

    const averageRating =
      reviews.reduce((acc, item) => acc + item.rating, 0) / reviewsCount;

    await this.productModel.findByIdAndUpdate(review.productId, {
      reviewsCount,
      averageRating,
    });

    return review;
  }

  async findOne(id: string): Promise<ReviewDocument | null> {
    return this.reviewModel.findById(id).exec();
  }

  async findByProduct(productId: string): Promise<ReviewDocument[]> {
    return this.reviewModel.find({ productId }).exec();
  }
}
