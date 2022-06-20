CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users(
    uuid UUID DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    PRIMARY KEY (uuid)
);

INSERT INTO users VALUES ("nathan", crypt("admin", "my_password"));