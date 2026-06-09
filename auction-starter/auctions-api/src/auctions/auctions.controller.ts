import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { AuctionItem, PromotedAuctionItem } from './auction-item';

@Controller('auctions')
export class AuctionsController {
  constructor(private readonly auctions: AuctionsService) {}

  @Get()
  getAll(
    @Query('isPromoted') isPromoted?: string,
  ): Promise<AuctionItem[] | PromotedAuctionItem[]> {
    return isPromoted === 'true'
      ? this.auctions.findPromoted()
      : this.auctions.findAll();
  }

  @Get('check-title')
  checkName(@Query('title') title: AuctionItem['title']): {
    isRestricted: boolean;
  } {
    return { isRestricted: this.auctions.checkAuctionTitleRestrictions(title) };
  }

  @Post()
  create(@Body() body: Omit<AuctionItem, 'uid'>): Promise<AuctionItem> {
    
    return this.auctions.create(body);
  }
}
