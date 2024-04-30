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
    return await this.turnoRepository
      .createQueryBuilder('turno')
      .leftJoinAndSelect('turno.medicoId', 'medico')
      .leftJoinAndSelect('turno.pacienteId', 'paciente')
      .select([
        'turno.id',
        'turno.date',
        'turno.hour',
        'turno.isConfirmed',
        'medico.fullName', // Seleccionar solo el nombre del medico
        'medico.especialty', // Seleccionar solo la especialidad del medico
        'paciente.fullName', // Seleccionar solo el nombre del paciente
        'paciente.obraSocial', // Seleccionar solo obra social
      ])
      .getMany();
  }

  async turnoDisponible() {
    return await this.turnoRepository.find({
      where: { isConfirmed: false },
    });
  }
  async findOne(id: string) {
    const turno = await this.turnoRepository
      .createQueryBuilder('turno')
      .where('turno.id = :id', { id })
      .leftJoinAndSelect('turno.medicoId', 'medico')
      .leftJoinAndSelect('turno.pacienteId', 'paciente')
      .select([
        'turno.id',
        'turno.date',
        'turno.hour',
        'turno.isConfirmed',
        'medico.fullName', // Seleccionar solo el nombre del medico
        'medico.matricula',
        'medico.especialty', // Seleccionar solo la especialidad del medico
        'paciente.fullName', // Seleccionar solo el nombre del paciente
        'paciente.dni',
        'paciente.numAfiliado',
        'paciente.obraSocial', // Seleccionar solo obra social
      ])
      .getOne();
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
