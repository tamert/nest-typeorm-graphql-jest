import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';
import {FastifyAdapter} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';

describe('AppController (e2e)', () => {
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

    const helloQuery = `
      query {
        hello
      }`;

    it('fetch', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .send({
                operationName: null,
                query: helloQuery,
            })
            .expect(({body}) => {
                expect(body.data.hello).toEqual('hello');
            })
            .expect(200);
    });

    it('hello 2', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .send({
                operationName: null,
                query: helloQuery,
            })
            .expect(({body}) => {
                expect(body.data.hello).toEqual('hello');
            })
            .expect(200);
    });


});