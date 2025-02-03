import { clientes, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getClientes() {
    return prisma.clientes.findMany();
}

export async function getCliente(id: number) {
    return prisma.clientes.findUnique({
        where: { id }
    });
}

export async function addCliente(novoUser: clientes) {
    return prisma.clientes.create({
        data: novoUser
    });
}

export async function updateCliente(id: number, newData: clientes) {
    return prisma.clientes.update({
        where: { id },
        data: newData
    });
}

export async function deleteCliente(id: number) {
    return prisma.clientes.delete({
        where: { id }
    });
}