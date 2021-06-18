import {FieldMiddleware, MiddlewareContext, NextFn} from "@nestjs/graphql";
import {Role} from "../../auth/enums";
import {ForbiddenException, UnauthorizedException} from "@nestjs/common";


export const checkRoleMiddleware: FieldMiddleware = async (
    ctx: MiddlewareContext,
    next: NextFn,
) => {
    const {info, context} = await ctx;

    console.log(typeof (context));

    // @ts-ignore
    const user = context.req.user ?? "false";

    console.log(user);

    if (!user) {
        throw new UnauthorizedException();
    }

    const {extensions} = info.parentType.getFields()[info.fieldName];
    const userRole = Role.USER;

    if (!user.IsSuperUser && userRole !== extensions.role) {
        throw new ForbiddenException(
            `User does not have sufficient permissions to access "${info.fieldName}" field.`,
        );
    }
    return next();
};

