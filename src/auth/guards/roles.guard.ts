import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private usersService: UsersService) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.some((role) => user.roles?.includes(role));
    }
}