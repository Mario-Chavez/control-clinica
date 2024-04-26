import { Paciente } from 'src/paciente/entities/paciente.entity';
import { PacienteMedicosRelation } from 'src/relations/entities/pacienteMedico-relation.entity';
import { Turno } from 'src/turnos/entities/turno.entity';
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

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
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

  @Column('text', {
    array: true,
    default: ['doctor'],
  })
  roles: string[];

  @Column('bool', { default: true })
  isActive: boolean;

  @OneToMany(() => PacienteMedicosRelation, (paciente) => paciente.paciente)
  pacientesIncludes: PacienteMedicosRelation[];

  @OneToMany(() => Turno, (turno) => turno.medico)
  turnos: Turno[];
}
