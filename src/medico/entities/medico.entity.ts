import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

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

  @Column('text', { array: true, nullable: true })
  obrasSociales: string[];

  @ManyToMany(() => Paciente, (paciente) => paciente.medicos)
  pacientes: Paciente[];
}
