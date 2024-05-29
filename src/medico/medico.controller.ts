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
import { Auth } from 'src/auth/decorator/auth.decorator';
import { Role } from 'src/auth/enums/rol.enum';

@Controller('medico')
export class MedicoController {
  constructor(private readonly medicoService: MedicoService) {}

  @Post()
  create(@Body() createMedicoDto: CreateMedicoDto) {
    return this.medicoService.create(createMedicoDto);
  }

  @Auth(Role.ADMIN)
  @Get()
  findAll() {
    return this.medicoService.findAll();
  }

  @Auth(Role.ADMIN, Role.DOCTOR, Role.USER)
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.medicoService.findOne(term);
  }

  @Auth(Role.ADMIN, Role.DOCTOR)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMedicoDto: UpdateMedicoDto,
  ) {
    return this.medicoService.update(id, updateMedicoDto);
  }

  @Auth(Role.ADMIN, Role.DOCTOR)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.medicoService.remove(id);
  }
}
