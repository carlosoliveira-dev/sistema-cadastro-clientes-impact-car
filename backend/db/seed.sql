CREATE TABLE IF NOT EXISTS users (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 email TEXT UNIQUE NOT NULL,
 password_hash TEXT NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS customers (
 id SERIAL PRIMARY KEY,
 user_id INTEGER NOT NULL,
 name TEXT NOT NULL,
 email TEXT NOT NULL,
 phone TEXT NOT NULL,
 address TEXT,
 CONSTRAINT fk_user_customer FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (name, email, password_hash) VALUES
 ('Carlos', 'Carlos@gmail.com', 'hash');

INSERT INTO customers (user_id, name, email, phone, address) VALUES
 (1, 'John', 'john@gmail.com', '51900001111', 'Rua do John, 007');