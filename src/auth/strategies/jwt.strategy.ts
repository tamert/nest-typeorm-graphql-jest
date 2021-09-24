import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '../../users/entities/user.entity';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private usersService: UsersService;

    public constructor(usersService: UsersService, reflector: Reflector) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                ExtractJwt.fromAuthHeaderAsBearerToken(),
                ExtractJwt.fromUrlQueryParameter('access-token'),
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: process.env.JWT_EXPIRES_IN + 's',
            },
        });

        this.usersService = usersService;
    }

    async validate(payload: any) {
        let user: User | null = null;
        if (payload && payload.salt)
            user = await this.usersService.findOne({
                where: { salt: payload.salt },
                relations: ['permissions'],
            });

        return user;
    }
}
