import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Medico } from 'src/medico/entities/medico.entity';
import * as bcrypt from 'bcrypt';
import { AuthUser, JwtPayload } from './interface';
import { JwtService } from '@nestjs/jwt';
import { Administrador } from 'src/administrador/entities/administrador.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,
    @InjectRepository(Administrador)
    private readonly adminRepository: Repository<Administrador>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;

    // Buscar usuario en todas las tablas
    const user = await this.findUserByEmail(email);
    if (!user) throw new UnauthorizedException('Credentials not valid (email)');

    // Verificar la contraseña
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credentials not valid (password)');
    }

    const payload: JwtPayload = {
      id: user.id,
      role: user.roles,
    };
    const token = this.getJwtToken(payload);

    return {
      token,
    };
  }

  private async findUserByEmail(email: string): Promise<AuthUser | null> {
    // Buscar en la tabla de pacientes
    const paciente = await this.pacienteRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'roles'],
    });

    if (paciente) {
      return {
        id: paciente.id,
        email: paciente.email,
        password: paciente.password,
        roles: paciente.roles,
      };
    }

    // Buscar en la tabla de médicos
    const medico = await this.medicoRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'roles'],
    });

    if (medico) {
      return {
        id: medico.id,
        email: medico.email,
        password: medico.password,
        roles: medico.roles,
      };
    }

    // Buscar en la tabla de administradores
    const admin = await this.adminRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'roles'],
    });

    if (admin) {
      return {
        id: admin.id,
        email: admin.email,
        password: admin.password,
        roles: admin.roles,
      };
    }

    // Si no se encuentra en ninguna tabla, retorna null
    return null;
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
