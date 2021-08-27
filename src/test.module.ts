import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {RecipesModule} from './recipes/recipes.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import {UsersModule} from "./users/users.module";
import {AuthModule} from "./auth/auth.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: false
        }),
        RecipesModule,
        UsersModule,
        AuthModule,

        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'database.sqlite',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
            logging: true
        }),

        GraphQLModule.forRoot({
            installSubscriptionHandlers: true,
            playground: false,
            debug: false,
            introspection: true,
            typePaths: ['./src/common/graphql.global.graphql'],
            autoSchemaFile: './schema.gql',
            sortSchema: true,
            context: ({req}) => ({...req}),
        }),
    ],
})
export class AppModule {
}
