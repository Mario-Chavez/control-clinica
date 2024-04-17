import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistoriaclinicaService } from './historiaclinica.service';
import { CreateHistoriaclinicaDto } from './dto/create-historiaclinica.dto';
import { UpdateHistoriaclinicaDto } from './dto/update-historiaclinica.dto';

@Controller('historiaclinica')
export class HistoriaclinicaController {
  constructor(private readonly historiaclinicaService: HistoriaclinicaService) {}

  @Post()
  create(@Body() createHistoriaclinicaDto: CreateHistoriaclinicaDto) {
    return this.historiaclinicaService.create(createHistoriaclinicaDto);
  }

  @Get()
  findAll() {
    return this.historiaclinicaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historiaclinicaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoriaclinicaDto: UpdateHistoriaclinicaDto) {
    return this.historiaclinicaService.update(+id, updateHistoriaclinicaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historiaclinicaService.remove(+id);
  }
}
