import { Module, type OnModuleInit } from '@nestjs/common';
import { runMigrations } from '../db/migrate';
import { AuctionsModule } from '../auctions/auctions.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdvicesModule } from '../advices/advices.module';

@Module({
  imports: [AuctionsModule, AdvicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  /** Ensure the schema exists before serving requests (seed runs separately). */
  onModuleInit(): Promise<void> {
    return runMigrations();
  }
}
