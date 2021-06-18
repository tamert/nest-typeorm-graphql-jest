import {createParamDecorator, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import {GqlExecutionContext} from '@nestjs/graphql';

/**
 *  async recipe(@CurrentUser({required: true}) user: User, @Args('id') id: string): Promise<Recipe> {
        console.log(user);
 */

export interface CurrentUserOptions {
    required?: boolean;
}

export const CurrentUser: (options?: CurrentUserOptions) => ParameterDecorator = createParamDecorator((data: unknown, context: ExecutionContext, options: CurrentUserOptions = {}) => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    if (options.required && !user) {
        throw new UnauthorizedException();
    }
    return user;
});

