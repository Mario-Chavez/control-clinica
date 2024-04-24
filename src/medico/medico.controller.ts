import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { MedicoService } from './medico.service';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';

@Controller('medico')
export class MedicoController {
  constructor(private readonly medicoService: MedicoService) {}

  @Post()
  create(@Body() createMedicoDto: CreateMedicoDto) {
    return this.medicoService.create(createMedicoDto);
  }

  @Get()
  findAll() {
    return this.medicoService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.medicoService.findOne(term);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMedicoDto: UpdateMedicoDto,
  ) {
    return this.medicoService.update(id, updateMedicoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.medicoService.remove(id);
  }
}
