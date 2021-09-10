import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

export const CurrentLocaleMiddleware: FieldMiddleware = async (ctx: MiddlewareContext, next: NextFn) => {
    const value = await next();
    return ctx.source.translations.find((element) => element.locale == (<any>ctx.context).req.headers.locale);
};
