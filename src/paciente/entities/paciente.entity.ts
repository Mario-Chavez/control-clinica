import { PacienteMedicosRelation } from 'src/relations/entities/pacienteMedico-relation.entity';
import { Turno } from 'src/turnos/entities/turno.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';

@Entity('paciente')
export class Paciente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  fullName: string;

  @Column('text')
  birthdate: Date;

  @Column('text')
  address: string;

  @Column()
  phone: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('text')
  obraSocial: string;

  @Column('numeric')
  numAfiliado: number;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @Column('bool', { default: true })
  isActive: boolean;

  @Column('text', {
    array: true,
    default: [],
  })
  historialMedico: string[];

  @Column('text', { unique: true })
  dni: string;

  @OneToMany(() => PacienteMedicosRelation, (medico) => medico.medico)
  medicosIncludes: PacienteMedicosRelation[];

  @OneToMany(() => Turno, (turno) => turno.paciente)
  turnos: Turno[];

  /* guardamos en minuscalas el email */
  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }
  /* tb para actualizar */
  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
