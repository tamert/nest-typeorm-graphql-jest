import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RecipesModule } from './recipes/recipes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UpperCaseDirective } from './common/directives/upper-case.directive';
import { DateFormatDirective } from './common/directives/date-format.directive';

@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: false,
        }),
        RecipesModule,
        UsersModule,
        AuthModule,
        TypeOrmModule.forRoot({
            type: process.env.DB_TYPE as any,
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_BACKUP_DATABASE,
            synchronize: process.env.NODE_ENV !== 'prod',
            autoLoadEntities: true,
            entities: ['src/*.entity.ts'],
            migrations: ['src/migration/*{.ts}'],
        }),
        GraphQLModule.forRoot({
            installSubscriptionHandlers: true,
            schemaDirectives: {
                upper: UpperCaseDirective,
                date: DateFormatDirective,
            },
            playground: false,
            debug: false,
            introspection: true,
            typePaths: ['./src/common/graphql.global.graphql'],
            autoSchemaFile: './schema.gql',
            sortSchema: true,
            context: ({ req }) => ({ ...req }),
        }),
    ],
})
export class AppModule {}
