import { Injectable } from '@nestjs/common';
import { CreateHistoriaclinicaDto } from './dto/create-historiaclinica.dto';
import { UpdateHistoriaclinicaDto } from './dto/update-historiaclinica.dto';

@Injectable()
export class HistoriaclinicaService {
  create(createHistoriaclinicaDto: CreateHistoriaclinicaDto) {
    return 'This action adds a new historiaclinica';
  }

  findAll() {
    return `This action returns all historiaclinica`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historiaclinica`;
  }

  update(id: number, updateHistoriaclinicaDto: UpdateHistoriaclinicaDto) {
    return `This action updates a #${id} historiaclinica`;
  }

  remove(id: number) {
    return `This action removes a #${id} historiaclinica`;
  }
}
