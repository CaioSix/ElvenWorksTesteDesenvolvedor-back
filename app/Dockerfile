# Usa uma imagem leve do Node.js
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências e instala-os
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Cria um grupo e usuário não-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Altera a propriedade dos arquivos para o usuário criado
RUN chown -R appuser:appgroup /app

# Define o usuário não-root para a execução do container
USER appuser

# Comando para rodar o Prisma antes de iniciar a aplicação
CMD npx prisma db push && npm start
