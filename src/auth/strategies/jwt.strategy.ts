import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Repository } from 'typeorm';
import { Medico } from 'src/medico/entities/medico.entity';
import { JwtPayload } from '../interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    let user: Paciente | Medico;

    const findUser = await this.pacienteRepository.findOneBy({
      id: payload.id,
    });
    user = findUser
      ? findUser
      : await this.medicoRepository.findOneBy({
          id: payload.id,
        });

    if (!user) throw new UnauthorizedException('token invalido');

    if (user.isActive === false)
      throw new UnauthorizedException('User not active');

    return user;
  }
}
