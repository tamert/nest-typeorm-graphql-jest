import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {User} from "../users/models/users.model";
import {checkPassword} from "../common/helpers/password.helper";
import {UsersService} from "../users/users.service";
import {RefreshTokenService} from "./refresh-token/refresh-token.service";
//import {internalServerError} from "../common/errors";
import {LoginResponse} from "./dto/login-response.dto";
import {ConfigService} from "@nestjs/config";


@Injectable()
export class AuthService {
    constructor(
        protected usersService: UsersService,
        protected configService: ConfigService,
        protected refreshTokenService: RefreshTokenService,
        private readonly jwtService: JwtService,
    ) {
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne({
            email: email
        });

        if (!(user instanceof User))
            return null;

        const isMatch = await checkPassword(pass, user.password);

        if (isMatch) {
            return user;
        }

        return null;
    }

    async token(user: User): Promise<LoginResponse> {
        const accessToken = this.jwtService.sign(user.jwtPayload(), {
            secret: this.configService.get("JWT_SECRET"),
            expiresIn: `${this.configService.get('JWT_EXPIRES_IN')}s`
        });

        const refreshTokenDB = await this.refreshTokenService.create({user});

        const refreshToken = this.jwtService.sign(user.jwtPayload(), {
            secret: refreshTokenDB.refreshToken,
            expiresIn: `${this.configService.get('REFRESH_TOKEN_EXPIRES_IN')}s`
        });

        const expiresIn = new Date(new Date().getTime() + (parseInt(this.configService.get('JWT_EXPIRES_IN')) * 1000 ));

        return new LoginResponse(user, accessToken, expiresIn, refreshToken, refreshTokenDB.refreshTokenExpiresAt);
    }

    protected checkExpiresAt(expiresAt: Date) {
        return new Date(expiresAt).toISOString() > new Date().toISOString();
    }


    decode(token: string) {
        return this.jwtService.decode(token);
    }
}
