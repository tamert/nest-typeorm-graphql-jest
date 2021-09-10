import { SchemaDirectiveVisitor } from 'graphql-tools';
import { defaultFieldResolver, GraphQLField, GraphQLString } from 'graphql';
import formatDate from 'dateformat';

export class DateFormatDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field: GraphQLField<any, any>) {
        const { resolve = defaultFieldResolver } = field;
        const { defaultFormat } = this.args;
        field.args.push({
            deprecationReason: undefined,
            astNode: undefined,
            defaultValue: undefined,
            description: undefined,
            extensions: undefined,
            name: 'format',
            type: GraphQLString,
        });

        field.resolve = async (source, { format, ...otherArgs }, context, info) => {
            const date = await resolve.call(this, source, otherArgs, context, info);
            return formatDate(date, format || defaultFormat);
        };

        field.type = GraphQLString;
    }
}
