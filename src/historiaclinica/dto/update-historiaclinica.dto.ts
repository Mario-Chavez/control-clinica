import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoriaclinicaDto } from './create-historiaclinica.dto';

export class UpdateHistoriaclinicaDto extends PartialType(CreateHistoriaclinicaDto) {}
