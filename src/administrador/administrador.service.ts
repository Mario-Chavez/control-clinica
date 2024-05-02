import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdministradorDto } from './dto/create-administrador.dto';
import { UpdateAdministradorDto } from './dto/update-administrador.dto';
import { Repository } from 'typeorm';
import { Administrador } from './entities/administrador.entity';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { validate as isUUID } from 'uuid';

@Injectable()
export class AdministradorService {
  constructor(
    @InjectRepository(Administrador)
    private readonly administradorRepository: Repository<Administrador>,
  ) {}
  async create(createAdministradorDto: CreateAdministradorDto) {
    const { password, ...data } = createAdministradorDto;

    try {
      const admin = this.administradorRepository.create({
        ...data,
        password: bcrypt.hashSync(password, 10),
      });
      await this.administradorRepository.save(admin);
      return admin;
    } catch (error) {
      this.handleDbError(error);
    }
  }

  async findAll() {
    return await this.administradorRepository.find();
  }

  async findOne(id: string) {
    try {
      return await this.administradorRepository.findOneBy({ id });
    } catch (error) {
      this.handleDbError(error);
    }
  }

  async update(id: string, updateAdministradorDto: UpdateAdministradorDto) {
    try {
      const admin = await this.administradorRepository.preload({
        id,
        ...updateAdministradorDto,
      });

      if (!admin)
        throw new NotFoundException(`Administrador whith id:${id} not found`);

      return await this.administradorRepository.save(admin);
    } catch (error) {
      this.handleDbError(error);
    }
  }

  async remove(id: string) {
    const admin = await this.findOne(id);

    return await this.administradorRepository.remove(admin);
  }

  /* manage error */

  private handleDbError(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    console.log(error);
    throw new InternalServerErrorException('Please check server logs');
  }
}
