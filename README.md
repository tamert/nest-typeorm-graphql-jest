<h1 align="center">
Starter - NestJS + TypeORM + GraphQL + Jest + JWT
</h1>

<p align="center">Simple GraphQL API with NestJS in Back-end. </p>

<p align="center">
  <a href="https://github.com/90pixel/nest-typeorm-graphql-jest/contributors">
    <img src="https://img.shields.io/github/contributors/90pixel/nest-typeorm-graphql-jest?color=%237159c1&logoColor=%237159c1&style=flat" alt="Contributors">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/github/license/tamert/nest-typeorm-graphql-jest?color=%237159c1&logo=mit" alt="License">
  </a>
</p>

<hr>


## Functional Requirements

- [x] New recipes can be created
- [x] Recipe, Recipes can be listed
- [x] Recipe can be deleted 
- [x] Graphql can be testing
- [x] Graphql Query must have pagination
- [x] User, Users can be listed
- [x] User can be logged (JWT Token) with username and password
- [X] User have RefreshToken  
- [X] User have User Role (https://docs.nestjs.com/graphql/extensions)
- [X] Soft Delete
- [X] Translatable Entity
- [X] Remove orphaned entities from a relation (https://github.com/typeorm/typeorm/issues/6382)
- [X] When create a new recipe, that should be kept whom (Recipe -> User Relations)
- [ ] API Exception Structures
- [ ] Batch Actions
- [ ] DataLoader integration


## Non-functional Requirements

- [x] Nest.js
- [x] GraphQL
- [x] TypeORM
- [x] Jest

## What can be better?

- Automatic Testing for GraphQL APIs
- Maybe can running PostgreSQL

## Dependencies

- [Node](https://nodejs.org/en/) = v14.17.0

## Getting started

1. Clone this repository;<br />
2. Run `npm or yarn install` at each project in order to install dependencies.<br />
3. Run `yarn start:dev` for `back-end` and `yarn start` for `front-end` folder.<br />
4. Access `localhost:3000` in your browser. GraphQL playground: `localhost:3333/graphql`.<br />

## Testing

Run `npm run test:e2e` and watch 

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.
