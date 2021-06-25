import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';
import {FastifyAdapter} from '@nestjs/platform-fastify';
import {ValidationPipe} from '@nestjs/common';
import {readFileSync} from 'fs';

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

    afterAll(async () => {
        await app.close();
    });

    const mutationAdd = readFileSync(__dirname + '/../graphql/mutation/recipeAdded.graphql', 'utf8');

    it('fetch all', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .send({
                operationName: null,
                query: mutationAdd,
            })
            .expect(({body}) => {
                expect(body.data.addRecipe).toBeDefined();
                request(app.getHttpServer())
                    .post('/graphql')
                    .send({
                        operationName: null,
                        query: 'query {\n' +
                            '    recipe(id: "'+body.data.addRecipe.id+'") {\n' +
                            '            id\n' +
                            '            title\n' +
                            '    }\n' +
                            '}',
                    })
                    .expect(({body}) => {
                        expect(body.data.recipe).toBeDefined();
                        request(app.getHttpServer())
                            .post('/graphql')
                            .send({
                                operationName: null,
                                query: 'mutation {\n' +
                                    '    removeUser(id: "'+body.data.addRecipe.id+'") {\n' +
                                    '        status\n' +
                                    '        data {\n' +
                                    '            id\n' +
                                    '        }\n' +
                                    '    }\n' +
                                    '}',
                            })
                            .expect(({body}) => {
                                expect(body.data.removeUser).toBeDefined();
                                expect(body.data.removeUser.status).toEqual(true);
                            }).expect(200)
                    }).expect(200)
            })
            .expect(200);
    });


});
