import { Request, Response } from 'express';
import { getClientes, getCliente, addCliente, updateCliente, deleteCliente } from '../repositories/clientesRepository';

export const listarClientes = async (req: Request, res: Response) => {
    const clientes = await getClientes();
    res.json(clientes);
};

export const buscarCliente = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const cliente = await getCliente(id);
    if (cliente) {
        res.json(cliente);
    } else {
        res.status(404).json({ message: 'Cliente não encontrado' });
    }
};

export const criarCliente = async (req: Request, res: Response) => {
    const novoCliente = req.body;
    const cliente = await addCliente(novoCliente);
    res.status(201).json(cliente);
};

export const atualizarCliente = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const dadosAtualizados = req.body;
    const cliente = await updateCliente(id, dadosAtualizados);
    if (cliente) {
        res.json(cliente);
    } else {
        res.status(404).json({ message: 'Cliente não encontrado' });
    }
};

export const excluirCliente = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await deleteCliente(id);
    res.status(204).send();
};