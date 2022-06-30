## JWT Authentication

<p align="center">This is a simple JWT authentication microservice made with Node.js + Express.</p>

<p align="center">
  <a href="#computer-technologies">Technologies</a>&nbsp;&nbsp;|&nbsp;
  <a href="#gear-configuration">Configuration</a>&nbsp;&nbsp;|&nbsp;
  <a href="#monocle_face-other-commands">Other commands</a>
</p>

## :computer: Technologies

#### Main technologies used:

- [Node.js](https://nodejs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Express](https://expressjs.com)
- [PostgreSQL](https://www.postgresql.org)
- [TypeORM](https://typeorm.io)
- [JWT](https://jwt.io)

## :gear: Configuration

#### 1. First of all, you need to create/have a PostgreSQL database.

#### 2. Then, in `/.env` make sure the PostgreSQL variables are the same you use to connect to your database.

#### 3. To install all project dependencies:
```
$ npm install
```
or using Yarn:
```
$ yarn
```

#### 4. To init database, creating the users table:
```
$ npm run typeorm-migration
``` 
or using Yarn:
```
$ yarn typeorm-migration
```

#### 5. Finally, to run:
```
$ npm run dev
```
or using Yarn:
```
$ yarn dev
```

## :monocle_face: Other commands

#### To build the project for production:

```
$ npm run build
```
or using Yarn:
```
$ yarn build
```

#### To serve in production (it needs to be built first):

#### 1. In `/.env` switch ENV_TYPE from "development" to "production".

#### 2. Then, run in production by the following command:
```
$ npm run start
```
or using Yarn:
```
$ yarn start
```
