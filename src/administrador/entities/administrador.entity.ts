import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Administrador')
export class Administrador {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  fullName: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('text', {
    array: true,
    default: ['admin'],
  })
  roles: string[];

  @Column('bool', { default: true })
  isActive: boolean;
}
