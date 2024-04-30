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
  ) {
    this.cleanOldShifts();
  }

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
    return await this.turnoRepository
      .createQueryBuilder('turno')
      .where('turno.isConfirmed = :isConfirmed', { isConfirmed: false })
      .leftJoinAndSelect('turno.medicoId', 'medico')
      .select([
        'turno.date',
        'turno.hour',
        'turno.isConfirmed',
        'medico.fullName', // Seleccionar solo el nombre del medico
        'medico.especialty', // Seleccionar solo la especialidad del medico
      ])
      .getMany();
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
    const { isConfirmed, pacienteId, ...dataTurno } = updateTurnoDto;
    const turno = await this.turnoRepository.preload({
      id: id,
      ...dataTurno,
      pacienteId: isConfirmed ? pacienteId : null,
      isConfirmed: isConfirmed,
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

  /* old turnos */
  async cleanOldShifts() {
    try {
      const fechaLimite = new Date();

      fechaLimite.setDate(fechaLimite.getDate() - 1); // se eliminaran los datos pasado los 7 dias

      const resultado = await this.turnoRepository
        .createQueryBuilder()
        .delete()
        .where('date < :fechaLimite', { fechaLimite })
        .execute();

      console.log(`Se eliminaron ${resultado.affected} turnos antiguos.`);
    } catch (error) {
      console.error('Error al limpiar turnos antiguos:', error);
    }
  }
}
