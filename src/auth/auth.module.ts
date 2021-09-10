import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from './auth.resolver';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';

@Module({
    imports: [
        forwardRef(() => UsersModule),
        PassportModule,
        RefreshTokenModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: `${configService.get('JWT_EXPIRES_IN')}s`,
                },
            }),
        }),
    ],
    providers: [AuthService, ConfigService, JwtStrategy, AuthResolver],
    exports: [AuthService],
})
export class AuthModule {}
