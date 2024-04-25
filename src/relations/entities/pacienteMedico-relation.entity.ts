import { Medico } from '../../medico/entities/medico.entity';
import { Paciente } from '../../paciente/entities/paciente.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

@Entity('pacienteMedicosRelation')
export class PacienteMedicosRelation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Paciente, (paciente) => paciente.medicosIncludes)
  paciente: Paciente[];

  @ManyToOne(() => Medico, (medico) => medico.pacientesIncludes)
  medico: Medico[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaConsulta: Date;
}
