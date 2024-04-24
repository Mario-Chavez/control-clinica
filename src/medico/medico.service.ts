import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { Medico } from './entities/medico.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { validate as isUUID } from 'uuid';

@Injectable()
export class MedicoService {
  constructor(
    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,
  ) {}

  async create(createMedicoDto: CreateMedicoDto) {
    const { password, ...medicoData } = createMedicoDto;
    try {
      const medico = this.medicoRepository.create({
        ...medicoData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.medicoRepository.save(medico);
      return medico;
    } catch (error) {
      this.handleDbError(error);
    }
  }

  findAll() {
    return this.medicoRepository.find();
  }

  async findOne(term: string) {
    let medico: Medico;
    if (isUUID(term)) {
      medico = await this.medicoRepository.findOneBy({ id: term });
    } else {
      medico = await this.medicoRepository.findOne({
        // busca con partes del nombre no solo con el name completo
        where: { fullName: ILike(`%${term}%`) },
      });
    }
    if (!medico) {
      throw new NotFoundException(`Medico whith termino:${term} not found`);
    }
    return medico;
  }

  async update(id: string, updateMedicoDto: UpdateMedicoDto) {
    try {
      const medico = await this.medicoRepository.preload({
        id: id,
        ...updateMedicoDto,
      });

      if (!medico) {
        throw new NotFoundException(`Medico whith id:${id} not found`);
      }
      return await this.medicoRepository.save(medico);
    } catch (error) {
      this.handleDbError(error);
    }
  }

  async remove(id: string) {
    const medico = await this.findOne(id);
    return this.medicoRepository.remove(medico);
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
