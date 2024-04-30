import { Medico } from 'src/medico/entities/medico.entity';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'turnos' })
export class Turno {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  hour: Date;

  @Column('bool', { default: false })
  isConfirmed: boolean;

  @CreateDateColumn() // Campo para registrar la fecha y hora de creación del turno
  createdAt: Date;

  @ManyToOne(() => Medico, (medico) => medico.turnos)
  medicoId: Medico;

  @ManyToOne(() => Paciente, (paciente) => paciente.turnos, { nullable: true })
  pacienteId?: Paciente;
}
