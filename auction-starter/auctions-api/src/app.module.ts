import { Module } from '@nestjs/common';
import { AuctionsModule } from './auctions/auctions.module';
import { AdvicesModule } from './advices/advices.module';

@Module({
  imports: [AuctionsModule, AdvicesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
