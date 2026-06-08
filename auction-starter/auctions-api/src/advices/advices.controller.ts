import { Controller, Get, Param } from '@nestjs/common';
import { AdvicesService } from './advices.service';
import { Advice, AdviceSummary } from './advice';

@Controller('advices')
export class AdvicesController {
  constructor(private readonly advices: AdvicesService) {}

  @Get()
  getAll(): Promise<AdviceSummary[]> {
    return this.advices.findAll();
  }

  @Get(':uid')
  getOne(@Param('uid') uid: string): Promise<Advice> {
    return this.advices.findOne(uid);
  }
}
