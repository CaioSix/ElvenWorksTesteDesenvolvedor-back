
import express from 'express';
import { listarClientes, buscarCliente, criarCliente, atualizarCliente, excluirCliente } from '../controllers/clientesController';

const router = express.Router();

router.get('/', listarClientes);
router.get('/:id', buscarCliente);
router.post('/', criarCliente);
router.put('/:id', atualizarCliente);
router.delete('/:id', excluirCliente);

export default router;