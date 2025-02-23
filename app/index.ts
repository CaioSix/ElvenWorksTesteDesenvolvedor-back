import { inicializeTracing } from './src/instrumentation'
inicializeTracing();
import express from 'express';

const cors = require("cors");
import clientesRoutes from './src/routes/clientesRoutes';

const app = express();
app.use(cors()); 
const PORT = 3000;

 app.use(express.json());

app.use('/clientes', clientesRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});