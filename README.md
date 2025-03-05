Backend ElvenWorks - Documentação

Introdução

Este repositório contém o backend para o teste de aplicação da ElvenWorks. Ele foi desenvolvido utilizando Node.js, Express, Prisma e OpenTelemetry para instrumentação.

Tecnologias Utilizadas

Node.js - Ambiente de execução JavaScript no servidor.

Express - Framework web minimalista para Node.js.

Prisma - ORM moderno para banco de dados.

TypeScript - Superset do JavaScript com tipagem estática.

Docker - Containeirização da aplicação.

OpenTelemetry - Monitoramento e instrumentação.

Estrutura do Projeto

ElvenWorksTesteDesenvolvedor-back/
│-- README.md
│-- docker-compose.yml
│-- app/
│   │-- Dockerfile
│   │-- index.ts
│   │-- otel-collector-config.yml
│   │-- package.json
│   │-- package-lock.json
│   │-- tsconfig.json
│   │-- prisma/
│   │-- src/
│       │-- controllers/
│       │-- repositories/
│       │-- routes/
│       │-- instrumentation.ts

Instalação e Configuração

Requisitos

Node.js v16+

Docker e Docker Compose

Passos para Configuração

Clone o repositório:

git clone https://github.com/seu-usuario/seu-repositorio.git

Acesse o diretório do projeto:

cd ElvenWorksTesteDesenvolvedor-back/app

Instale as dependências:

npm install

Configure as variáveis de ambiente criando um arquivo .env com os seguintes valores:

DATABASE_URL="seu_banco_de_dados"

Execute as migrações do Prisma:

npx prisma migrate dev

Inicie o servidor:

npm start

Uso do Docker

Para rodar a aplicação via Docker, utilize os comandos:

docker build -t backend-elven .
docker run -p 3000:3000 backend-elven

Monitoramento com OpenTelemetry

A aplicação utiliza OpenTelemetry para capturar métricas e traces. Certifique-se de configurar corretamente o otel-collector-config.yml e iniciar o coletor com:

docker-compose up -d

Endpoints

Abaixo está uma tabela com os principais endpoints da API:

Método

Rota

Descrição

GET

/status

Retorna o status da API

POST

/users

Cria um novo usuário

GET

/users/:id

Obtém detalhes de um usuário

Contribuição

Sinta-se à vontade para contribuir com melhorias! Para isso:

Crie um fork do repositório.

Crie um branch para a sua feature (git checkout -b minha-feature).

Commite suas mudanças (git commit -m 'Minha nova feature').

Envie para o repositório (git push origin minha-feature).

Abra um Pull Request.
