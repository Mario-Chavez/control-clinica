import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from './entities/paciente.entity';
import { ILike, Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { validate as isUUID } from 'uuid';
import { Medico } from 'src/medico/entities/medico.entity';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(Paciente)
    private readonly userRepository: Repository<Paciente>,

    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,
  ) {}

  async create(createPacienteDto: CreatePacienteDto) {
    const {
      password,
      roles = [],
      medicos = [],
      ...pacientData
    } = createPacienteDto;

    try {
      const paciente = this.userRepository.create({
        ...pacientData,
        password: bcrypt.hashSync(password, 10),
        medicos: medicos.map((id) => ({ id: id })),
      });

      await this.userRepository.save(paciente);
      // Guardar el ID del paciente en la tabla del médico
      // for (const medicoId of medicos) {
      //   const medico = await this.medicoRepository.findOne(medicoId);
      //   if (medico) {
      //     medico.pacientes.push(paciente);
      //     await this.medicoRepository.save(medico);
      //   }
      // }

      // await this.pacienteRepository.save(paciente);
      return paciente;

      return paciente;
    } catch (error) {
      this.handleDbError(error);
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      this.handleDbError(error);
    }
  }

  async findOne(term: string) {
    let paciente: Paciente;
    if (isUUID(term)) {
      paciente = await this.userRepository.findOneBy({ id: term });
    } else {
      paciente = await this.userRepository.findOne({
        // busca con partes del nombre no solo con el name completo
        where: { fullName: ILike(`%${term}%`) },
      });
    }
    if (!paciente)
      throw new NotFoundException(`User whith termino:${term} not found`);

    return paciente;
  }

  async update(id: string, updatePacienteDto: UpdatePacienteDto) {
    // try {
    //   const paciente = await this.userRepository.preload({
    //     id: id,
    //     ...updatePacienteDto,
    //   });
    //   if (!paciente)
    //     throw new NotFoundException(`User whith id:${id} not found`);
    //   return await this.userRepository.save(paciente);
    // } catch (error) {
    //   this.handleDbError(error);
    // }
  }

  async remove(id: string) {
    const paciente = await this.findOne(id);
    await this.userRepository.remove(paciente);
  }

  /* manage error */
  // el NEVER no regresa nunca un valor
  private handleDbError(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    console.log(error);
    throw new InternalServerErrorException('Please check server logs');
  }
}
