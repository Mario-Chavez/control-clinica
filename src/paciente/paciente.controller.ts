import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('paciente')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Post()
  create(@Body() createPacienteDto: CreatePacienteDto) {
    return this.pacienteService.create(createPacienteDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.pacienteService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.pacienteService.findOne(term);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePacienteDto: UpdatePacienteDto,
  ) {
    return this.pacienteService.update(id, updatePacienteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.pacienteService.remove(id);
  }
}
