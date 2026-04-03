import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CompareService } from './compare.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import type { Request } from 'express';

@Controller('compare')
@UseGuards(JwtAuthGuard)
export class CompareController {
  constructor(private readonly compareService: CompareService) {}

  @Get()
  getCompare(@Req() req: Request) {
    const userId = (req.user as any)?.id;
    if (!userId) {
      throw new UnauthorizedException('No user in request');
    }
    return this.compareService.getCompareByUser(userId);
  }

  @Post('add')
  addToCompare(@Req() req: Request, @Body('productId') productId: string) {
    const userId = (req.user as any)?.id;
    if (!userId) {
      throw new UnauthorizedException('No user in request');
    }
    return this.compareService.addToCompare(userId, productId);
  }

  @Delete('remove')
  removeFromCompare(@Req() req: Request, @Body('productId') productId: string) {
    const userId = (req.user as any)?.id;
    if (!userId) {
      throw new UnauthorizedException('No user in request');
    }
    return this.compareService.removeFromCompare(userId, productId);
  }
}
