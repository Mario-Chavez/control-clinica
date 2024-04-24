import { Paciente } from 'src/paciente/entities/paciente.entity';
import { PacienteMedicosRelation } from 'src/relations/entities/pacienteMedico-relation.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity('Medico')
export class Medico {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @Column('text')
  fullName: string;

  @Column('text')
  especialty: string;

  @Column('int')
  matricula: number;

  @Column('text')
  phone: string;

  @Column('text', { array: true, default: ['particular'] })
  obrasSociales: string[];

  @OneToMany(() => PacienteMedicosRelation, (paciente) => paciente.paciente)
  pacientesIncludes: PacienteMedicosRelation[];
}
