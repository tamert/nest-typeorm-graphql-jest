import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {RecipesModule} from './recipes/recipes.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {UsersModule} from "./users/users.module";
import {AuthModule} from "./auth/auth.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        RecipesModule,
        UsersModule,
        AuthModule,
        TypeOrmModule.forRoot({
            type: process.env.DB_TYPE as any,
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            synchronize: process.env.NODE_ENV !== 'prod',
            autoLoadEntities: true,
            migrations: ['src/migration/*{.ts}'],
        }),
        GraphQLModule.forRoot({
            installSubscriptionHandlers: true,
            autoSchemaFile: 'schema.gql'
        }),
    ],
})
export class AppModule {
}
