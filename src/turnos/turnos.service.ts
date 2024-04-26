import { Injectable } from '@nestjs/common';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turno } from './entities/turno.entity';

@Injectable()
export class TurnosService {
  constructor(
    @InjectRepository(Turno)
    private readonly turnoRepository: Repository<Turno>,
  ) {}

  async create(createTurnoDto: CreateTurnoDto) {
    const turno = this.turnoRepository.create(createTurnoDto);
    return await this.turnoRepository.save(turno);
  }

  async findAll() {
    return await this.turnoRepository.find();
  }

  async turnoDisponible() {
    return await this.turnoRepository.find({
      where: { isConfirmed: false },
    });
  }
  async findOne(id: string) {
    const turno = await this.turnoRepository.findOneBy({ id });
    if (!turno) {
      throw new Error(`Turno con id ${id} no encontrado`);
    }
    return turno;
  }

  async update(id: string, updateTurnoDto: UpdateTurnoDto) {
    const turno = await this.turnoRepository.preload({
      id: id,
      ...updateTurnoDto,
    });
    if (!turno) {
      throw new Error(`Turno con id ${id} no encontrado`);
    }
    return await this.turnoRepository.save(turno);
  }

  async remove(id: string) {
    const turno = await this.findOne(id);
    return await this.turnoRepository.remove(turno);
  }
}
