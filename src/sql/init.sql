CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users(
    "uuid" UUID DEFAULT uuid_generate_v4(),
    "username" VARCHAR UNIQUE NOT NULL,
    "password" VARCHAR NOT NULL,
    PRIMARY KEY (uuid)
);

INSERT INTO users ("username", "password") VALUES ('nathan', crypt('admin', 'my_password'));