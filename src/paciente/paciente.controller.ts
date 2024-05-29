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
import { Role } from 'src/auth/enums/rol.enum';
import { Auth } from 'src/auth/decorator/auth.decorator';

@Controller('paciente')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Post()
  create(@Body() createPacienteDto: CreatePacienteDto) {
    return this.pacienteService.create(createPacienteDto);
  }

  @Auth(Role.ADMIN) //custom decorator
  @Get()
  findAll() {
    return this.pacienteService.findAll();
  }

  @Auth(Role.ADMIN)
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.pacienteService.findOne(term);
  }
  @Auth(Role.ADMIN, Role.USER)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePacienteDto: UpdatePacienteDto,
  ) {
    return this.pacienteService.update(id, updatePacienteDto);
  }

  @Auth(Role.ADMIN, Role.USER)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.pacienteService.remove(id);
  }
}
