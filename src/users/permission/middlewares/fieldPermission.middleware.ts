import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';
import { ForbiddenException, UnauthorizedException } from '@nestjs/common';

export const fieldPermissionMiddleware: FieldMiddleware = async (ctx: MiddlewareContext, next: NextFn) => {
    const { info, context } = await ctx;

    const auth = (<any>context).req.user ?? false;

    if (!auth) {
        throw new UnauthorizedException();
    }

    const { extensions } = info.parentType.getFields()[info.fieldName];
    /**
     * @todo added permission clickup id #n3aq4c
     */
    if (!auth.isSuperUser && extensions.role.filter((element) => auth.roles.includes(element)).length === 0) {
        throw new ForbiddenException(`User does not have sufficient permissions to access "${info.fieldName}" field.`);
    }
    return next();
};
