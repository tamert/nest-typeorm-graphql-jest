import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {User} from "../users/models/users.model";
import {checkPassword} from "../common/helpers/password.helper";
import {UsersService} from "../users/users.service";

@Injectable()
export class AuthService {
    constructor(
        protected usersService: UsersService,
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


    async token(user: User) {
        return {
            accessToken: this.jwtService.sign(user.jwtPayload()),
        };
    }

    decode(token: string) {
        return this.jwtService.decode(token);
    }
}
