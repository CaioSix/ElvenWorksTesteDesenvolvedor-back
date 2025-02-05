# Use a imagem oficial do Node.js
FROM node:18

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie a pasta prisma para o contêiner
COPY prisma ./prisma

# Execute a geração do cliente Prisma
RUN npx prisma generate

# Copie o restante do código da aplicação para o contêiner
COPY . .

# Compile o TypeScript (se necessário)
RUN npm run build

# Exponha a porta que o back-end usará
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
