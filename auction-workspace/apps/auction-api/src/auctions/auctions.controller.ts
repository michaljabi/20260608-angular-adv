import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import {
  type AuctionItem,
  createAuctionSchema,
} from '@auction-workspace/shared/domain';
import { AuctionsService } from './auctions.service';

@Controller('auctions')
export class AuctionsController {
  constructor(private readonly auctions: AuctionsService) {}

  /** GET /api/auctions  (optional ?isPromoted=true filter). */
  @Get()
  getAll(@Query('isPromoted') isPromoted?: string): Promise<AuctionItem[]> {
    return isPromoted === 'true'
      ? this.auctions.findPromoted()
      : this.auctions.findAll();
  }

  /** POST /api/auctions — validated against the shared contract. */
  @Post()
  create(@Body() body: unknown): Promise<AuctionItem> {
    const parsed = createAuctionSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.issues);
    }
    return this.auctions.create(parsed.data);
  }
}
