import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { Injectable, ExecutionContext, SetMetadata, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../../users/entities/user.entity';

export const Public = () => SetMetadata('public', true);
export const Permission = (...permissions: string[]) => SetMetadata('permissions', permissions);
export const Role = (...roles: string[]) => SetMetadata('roles', roles);

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    private public = false;
    private permissions: string[] = [];
    private roles: string[] = [];

    constructor(public reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext();
        this.public = this.reflector.get<boolean>('public', context.getHandler());
        this.permissions = this.reflector.get<string[]>('permissions', context.getHandler());
        this.roles = this.reflector.get<string[]>('roles', context.getHandler());
        return super.canActivate(new ExecutionContextHost([req]));
    }

    handleRequest(err, user, info) {
        if (err) {
            throw err;
        }

        if (user instanceof User) {
            // Role
            if (this.roles && this.roles.length && this.roles.some((role) => user.roles.includes(role))) {
                throw new ForbiddenException();
            }

            // Permission
            if (this.permissions && this.permissions.length) {
                const find = user.permissions.find((userPermission) =>
                    this.permissions.find((p) => p == userPermission.name),
                );
                if (!find) {
                    throw new ForbiddenException();
                }
            }
        } else {
            if (this.public && (this.roles && this.roles.length) === 0 && this.permissions && this.permissions.length)
                return user;
            throw new UnauthorizedException();
        }

        return user;
    }
}
