CREATE TABLE IF NOT EXISTS users (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 email TEXT NOT NULL,
 phone TEXT NOT NULL,
 address TEXT
);

INSERT INTO users (name, email, phone, address) VALUES
 ('John', 'john@gmail.com', '51900001111', 'Rua do John, 007');