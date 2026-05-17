CREATE TABLE IF NOT EXISTS users (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 email TEXT NOT NULL,
 telefone TEXT NOT NULL,
 endereco TEXT NOT NULL
);

INSERT INTO users (name, email, telefone, endereco) VALUES
 ('John', 'john@gmail.com', '51900001111', 'Rua do John, 007');