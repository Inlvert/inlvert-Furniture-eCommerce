import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-users.dto';
import { OAuthUserDto } from 'src/auth/dto/oauth-user.dto';
import { User, UserDocument } from './schema/users.schema';
import { use } from 'passport';
import {
  CartProduct,
  CartProductDocument,
} from 'src/cart-products/schema/cart-products.schema';
import path from 'path';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(CartProduct.name)
    private cartProductModel: Model<CartProductDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const exist = await this.userModel.findOne({ email: createUserDto.email });
    if (exist) throw new BadRequestException('User already exists');

    const hashed = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.userModel.create({
      ...createUserDto,
      password: hashed,
    });

    await this.cartProductModel.create({
      userId: user._id,
      items: [],
    });

    return user;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findOrCreateByGoogle(oauthUser: OAuthUserDto): Promise<UserDocument> {
    let user = await this.userModel.findOne({ email: oauthUser.email });

    if (user) {
      if (!user.googleId && oauthUser.googleId) {
        user.googleId = oauthUser.googleId;
        user.avatar = oauthUser.avatar;
        await user.save();
      }
      return user;
    }

    return this.userModel.create({ ...oauthUser, password: undefined });
  }

  async findOne(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.userModel
      .findById(id)
      .populate({
        path: 'cartProducts',
        populate: {
          path: 'productId',
        },
      })
      .exec();

    if (!user) throw new BadRequestException('User not found');

    const { password, ...result } = user.toObject();
    return result;
  }
}
