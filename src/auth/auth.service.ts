import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {User} from "../users/models/users.model";
import {checkPassword} from "../common/helpers/password.helper";
import {UsersService} from "../users/users.service";
import {RefreshTokenService} from "./refresh-token/refresh-token.service";
import {LoginResponse} from "./dto/login-response.dto";
import {ConfigService} from "@nestjs/config";
import {RefreshToken} from "./refresh-token/models/refresh-token.model";

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

    async validateRefreshToken(token: string): Promise<any> {

        const verify = this.jwtService.verify(token);
        if (!verify)
            return null;

        const db = await this.refreshTokenService.findOne({
            refreshToken: verify.refreshToken
        });

        if (!db || !this.checkExpiresAt(db.refreshTokenExpiresAt))
            return null;

        return db
    }


    async createRefreshToken(user: User): Promise<RefreshToken> {
        return await this.refreshTokenService.create({user});
    }

    async updateRefreshToken(refresh: RefreshToken): Promise<RefreshToken> {
        refresh.refreshToken = "";
        return await this.refreshTokenService.update(refresh);
    }

    async getUser(user: User): Promise<User> {
        return await this.usersService.findOne(user);
    }

    async token(user: User, refresh: RefreshToken): Promise<LoginResponse> {

        const accessToken = this.jwtService.sign(user.jwtPayload(), {
            secret: this.configService.get("JWT_SECRET"),
            expiresIn: `${this.configService.get('JWT_EXPIRES_IN')}s`
        });

        const refreshToken = this.jwtService.sign({
            "refreshToken": refresh.refreshToken,
            "user": user.jwtPayload()
        }, {
            secret: this.configService.get("JWT_SECRET"),
            expiresIn: `${this.configService.get('REFRESH_TOKEN_EXPIRES_IN')}s`
        });

        const expiresIn = new Date(new Date().getTime() + (parseInt(this.configService.get('JWT_EXPIRES_IN')) * 1000));

        return new LoginResponse(user, accessToken, expiresIn, refreshToken, refresh.refreshTokenExpiresAt);
    }

    protected checkExpiresAt(expiresAt: Date) {
        return new Date(expiresAt).toISOString() > new Date().toISOString();
    }

}
