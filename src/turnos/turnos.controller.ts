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
import { TurnosService } from './turnos.service';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { Role } from 'src/auth/enums/rol.enum';

@Controller('turnos')
export class TurnosController {
  constructor(private readonly turnosService: TurnosService) {}

  @Auth(Role.ADMIN, Role.DOCTOR)
  @Post()
  create(@Body() createTurnoDto: CreateTurnoDto) {
    return this.turnosService.create(createTurnoDto);
  }

  @Auth(Role.ADMIN, Role.DOCTOR, Role.USER)
  @Get()
  findAll() {
    return this.turnosService.findAll();
  }

  @Auth(Role.ADMIN, Role.DOCTOR, Role.USER)
  @Get('available')
  turnoDisponible() {
    return this.turnosService.turnoDisponible();
  }

  @Auth(Role.ADMIN, Role.DOCTOR, Role.USER)
  @Get('available/:date/:medicoName')
  findMedicosTurnos(
    @Param('medicoName') medicoName: string,
    @Param('date') date: string,
  ) {
    return this.turnosService.findTurnosByDateAndMedico(date, medicoName);
  }

  @Auth(Role.ADMIN, Role.DOCTOR, Role.USER)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.turnosService.findOne(id);
  }

  @Auth(Role.ADMIN, Role.DOCTOR, Role.USER)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTurnoDto: UpdateTurnoDto,
  ) {
    return this.turnosService.update(id, updateTurnoDto);
  }

  @Auth(Role.ADMIN, Role.DOCTOR)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.turnosService.remove(id);
  }
}
