import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';
import {FastifyAdapter} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { readFileSync } from 'fs';


describe('Recipes (e2e)', () => {
    let app;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication(new FastifyAdapter());

        app.useGlobalPipes(new ValidationPipe({ transform: true }));
        await app.init();
        app
            .getHttpAdapter()
            .getInstance()
            .ready();
    });

    afterAll(async () => {
        await app.close();
    });

    const queryList = readFileSync(__dirname + '/../graphql/recipes.graphql','utf8');

    it('fetch all', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .send({
                operationName: null,
                query: queryList,
            })
            .expect(({body}) => {
                expect(body.data.recipes).toBeDefined();
            })
            .expect(200);
    });

});