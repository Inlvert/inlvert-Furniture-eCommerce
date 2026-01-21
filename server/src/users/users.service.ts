import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-users.dto';
import { OAuthUserDto } from 'src/auth/dto/oauth-user.dto';
import { User, UserDocument } from './schema/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const exist = await this.userModel.findOne({ email: createUserDto.email });
    if (exist) throw new BadRequestException('User already exists');

    const hashed = await bcrypt.hash(createUserDto.password, 10);

    return this.userModel.create({ ...createUserDto, password: hashed });
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
}
