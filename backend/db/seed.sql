CREATE TABLE IF NOT EXISTS users (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 email TEXT NOT NULL,
 password TEXT NOT NULL
);

INSERT INTO users (name, email, password) VALUES
 ('John', 'john@gmail.com', 'p@ssword'),
 ('Maria', 'maria@gmail.com', 'p@ssword'),
 ('Camila', 'camila@gmail.com', 'p@ssword');