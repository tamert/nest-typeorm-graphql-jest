import {AuthGuard} from '@nestjs/passport';
import {GqlExecutionContext} from '@nestjs/graphql';
import {ExecutionContextHost} from '@nestjs/core/helpers/execution-context-host';
import {Injectable, ExecutionContext, UnauthorizedException, SetMetadata,} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {IS_PUBLIC_KEY} from '../decorators/publis.decorator';
import {UsersService} from "../../users/users.service";

export const Scopes = (...scopes: string[]) => SetMetadata('scopes', scopes);

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    public scopes = [];

    constructor(private reflector: Reflector, private userService: UsersService) {
        super();
    }

    canActivate(context: ExecutionContext) {

        this.scopes = this.reflector.get<string[]>('scopes', context.getHandler());

        const ctx = GqlExecutionContext.create(context);
        const {req} = ctx.getContext();

        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic)
            return true;

        return super.canActivate(new ExecutionContextHost([req]));
    }

    handleRequest(err, user, info) {
        if (user) {
            user = this.userService.findOne(user.id);
        } else if (this.scopes.indexOf("required") !== -1 && !user) {
            throw new UnauthorizedException();
        } else if (err) {
            throw err;
        }
        return user;
    }
}