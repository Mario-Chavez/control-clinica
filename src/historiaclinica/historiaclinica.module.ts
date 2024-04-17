import { Module } from '@nestjs/common';
import { HistoriaclinicaService } from './historiaclinica.service';
import { HistoriaclinicaController } from './historiaclinica.controller';

@Module({
  controllers: [HistoriaclinicaController],
  providers: [HistoriaclinicaService],
})
export class HistoriaclinicaModule {}
