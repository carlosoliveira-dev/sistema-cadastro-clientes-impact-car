# sistema-cadastro-clientes-impact-car
Projeto do 4º semestre em Ciência da Computação na Gran Faculdade.

## Comandos do Docker

### Inicia o app
docker compose watch

### Lista os grupos de serviços do docker compose
docker compose ls

### Finaliza um grupo de serviços pelo nome
docker compose -p sistema-cadastro-clientes-impact-car down



## Comandos do container postgress

### Acessa o banco de dados
psql -U postgres -d cadastro-clientes-db

### Lista cada registro da tabela users
SELECT * FROM users;

### Apaga um registro da tabela de acordo com o ID
DELETE FROM users WHERE id = 1;