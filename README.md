## JWT Authentication

<p align="center">This is a simple JWT authentication microservice made with Node.js + Express.</p>

<p align="center">
  <a href="#computer-technologies">Technologies</a>&nbsp;&nbsp;|&nbsp;
  <a href="#gear-configuration">Configuration</a>&nbsp;&nbsp;|&nbsp;
  <a href="#monocle_face-other-commands">Other commands</a>
</p>

## :computer: Technologies

#### Main used technologies:

- [Node.js](https://nodejs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Express](https://expressjs.com)
- [PostgreSQL](https://www.postgresql.org)

## :gear: Configuration

#### 1. First of all, you need to create/have a PostgreSQL database.

#### 2. Then, in `/.env` change the PostgreSQL variables to suit in your configurations.

#### 3. In `/src/sql/init.sql` there're some initial queries to create the users table and this one to insert the first item:
```
INSERT INTO users ("username", "password") VALUES ('nathan', crypt('admin', 'my_password'));
```
In this case, you can change 'my_password' for the same you defined as PG_PASSWORD_CRYPT_KEY in `./env`. Then you can run this queries in your database.

#### 4. To install all project dependencies:
```
$ npm install
```
or using Yarn:
```
$ yarn
```

#### 5. Then, to run:
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

```
$ npm run start
```
or using Yarn:
```
$ yarn start
```
