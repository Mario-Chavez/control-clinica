import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  id_paciente: string;

  @Column()
  fullName: string;

  @Column()
  birthdate: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  obraSocial: string;
}
