import express from 'express';
const cors = require("cors");
import clientesRoutes from './src/routes/clientesRoutes';

const app = express();
app.use(cors()); 
const PORT = 3000;

// Middleware para permitir o uso de JSON no corpo das requisições
app.use(express.json());

// Rotas da API
app.use('/clientes', clientesRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});