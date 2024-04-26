import { Medico } from 'src/medico/entities/medico.entity';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'turnos' })
export class Turno {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  hour: Date;

  @Column('bool', { default: false })
  isConfirmed: boolean;

  @ManyToOne(() => Medico, (medico) => medico.turnos)
  medico: Medico;

  @ManyToOne(() => Paciente, (paciente) => paciente.turnos, { nullable: true })
  paciente: Paciente;
}
