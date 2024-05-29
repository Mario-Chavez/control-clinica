import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Repository } from 'typeorm';
import { Medico } from 'src/medico/entities/medico.entity';
import { JwtPayload } from '../interface';
import { Administrador } from 'src/administrador/entities/administrador.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,
    @InjectRepository(Administrador)
    private readonly adminRepository: Repository<Administrador>,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    let user: Paciente | Medico | Administrador;

    user = await this.pacienteRepository.findOneBy({ id: payload.id });

    if (!user) {
      user = await this.medicoRepository.findOneBy({ id: payload.id });
    }

    if (!user) {
      user = await this.adminRepository.findOneBy({ id: payload.id });
    }

    if (!user) {
      throw new UnauthorizedException('token invalido');
    }
    if (user.isActive === false)
      throw new UnauthorizedException('User not active');

    return user;
  }
}
