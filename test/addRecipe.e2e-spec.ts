import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';
import {FastifyAdapter} from '@nestjs/platform-fastify';
import {ValidationPipe} from '@nestjs/common';
import {readFileSync} from 'fs';

/**
 * todo: can using token ("auth") for refresh token generated access token clickup task id #n3apzy
 */
describe('Recipes (e2e)', () => {
    let app;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication(new FastifyAdapter());

        app.useGlobalPipes(new ValidationPipe({transform: true}));
        await app.init();

        app.getHttpAdapter()
            .getInstance()
            .ready();
    });

    function getGraphQl(type: string, file: string)  {
        return readFileSync(__dirname + '/../graphql/'+type+'/'+file+'.graphql', 'utf8');
    }

    it('recipe crud', async () => {
        /**
         * user login
         */
        const loginRequest = await request(app.getHttpServer())
            .post('/graphql')
            .send({
                operationName: null,
                query: getGraphQl("query", "login"),
            });
        expect(loginRequest.status).toBe(200);
        expect(loginRequest.body.data.login.accessToken).toBeDefined();
        const token: object = {"authorization": "Bearer " + loginRequest.body.data.login.accessToken};

        /**
         * recipe add
         */
        const recipeAddedRequest = await request(app.getHttpServer())
            .post('/graphql')
            .set(token)
            .send({
                operationName: null,
                query: getGraphQl("mutation", "recipeAdded"),
            });
        expect(recipeAddedRequest.status).toBe(200);
        expect(recipeAddedRequest.body.data.addRecipe.id).toBeDefined();
        const recipeId: number = recipeAddedRequest.body.data.addRecipe.id

        /**
         * recipe get
         */
        const recipeGetRequest = await request(app.getHttpServer())
            .post('/graphql')
            .set(token)
            .send({
                operationName: null,
                query: getGraphQl("query", "recipe"),
                variables: {
                    id: recipeId
                }
            });
        expect(recipeGetRequest.status).toBe(200);
        expect(recipeGetRequest.body.data.recipe.title).toBeDefined();

        console.log(recipeGetRequest.body.data.recipe.title)

        /**
         * recipe get All
         */
        const recipeGetAllRequest = await request(app.getHttpServer())
            .post('/graphql')
            .set(token)
            .send({
                operationName: null,
                query: getGraphQl("query", "recipes"),
                variables: {
                    page: 1,
                    limit: 10
                }
            });
        expect(recipeGetAllRequest.status).toBe(200);
        expect(recipeGetAllRequest.body.data.recipes.currentPage).toBeDefined();
        expect(recipeGetAllRequest.body.data.recipes.totalCount).toBeDefined();

        /**
         * recipe get
         */
        const recipeDeleteRequest = await request(app.getHttpServer())
            .post('/graphql')
            .set(token)
            .send({
                operationName: null,
                query: getGraphQl("mutation", "recipeRemoved"),
                variables: {
                    id: recipeId
                }
            });
        expect(recipeDeleteRequest.status).toBe(200);
        expect(recipeDeleteRequest.body.data.removeRecipe.data.id).toBeDefined();

    });

    afterAll(async () => {
        await app.close();
    });

});
