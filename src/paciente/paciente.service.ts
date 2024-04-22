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

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(Paciente)
    private readonly userRepository: Repository<Paciente>,
  ) {}

  async create(createPacienteDto: CreatePacienteDto) {
    const { password, address, ...pacientData } = createPacienteDto;

    try {
      const paciente = this.userRepository.create({
        ...pacientData,
        address: address.trim(),
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(paciente);
      return paciente;
    } catch (error) {
      this.handleDbError(error);
    }
  }

  findAll() {
    return this.userRepository.find();
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
    try {
      const paciente = await this.userRepository.preload({
        id: id,
        ...updatePacienteDto,
      });
      if (!paciente)
        throw new NotFoundException(`User whith id:${id} not found`);
      return await this.userRepository.save(paciente);
    } catch (error) {
      this.handleDbError(error);
    }
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
