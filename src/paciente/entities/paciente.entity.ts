import { Medico } from 'src/medico/entities/medico.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity('Paciente')
export class Paciente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  fullName: string;

  @Column('text')
  birthdate: string;

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

  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @Column('bool', { default: true })
  isActive: boolean;

  @ManyToMany(() => Medico, (medico) => medico.pacientes, { eager: true })
  medicos: Medico[];

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
