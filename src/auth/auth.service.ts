import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Medico } from 'src/medico/entities/medico.entity';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;

    let user: Paciente | Medico;

    const findUser = await this.pacienteRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
    user = findUser
      ? findUser
      : await this.medicoRepository.findOne({
          where: { email },
          select: ['id', 'email', 'password'],
        });

    if (!user) throw new UnauthorizedException('Credentials not valid (email)');

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credentials not valid (password)');
    }

    return {
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
