import { clientes, PrismaClient } from "@prisma/client";
import { metrics } from '@opentelemetry/api';

import { trace, SpanStatusCode } from '@opentelemetry/api';

const tracer = trace.getTracer('prisma-tracer');
const meter = metrics.getMeter('prisma-meter');

// Cria um histograma para registrar a duração das consultas (em milissegundos)
const queryDurationHistogram = meter.createHistogram('prisma.query.duration', {
    description: 'Duração (ms) das consultas realizadas pelo Prisma',
});


const prisma = new PrismaClient();

export async function getClientes() {
    const span = tracer.startSpan('prisma.getUsers');
    const startTime = Date.now(); // Marca o início da operação


    try {
        // Opcional: registre atributos para melhor observabilidade
        span.setAttribute('db.system', 'mysql');
        span.setAttribute('db.operation', 'select');

        const users = await prisma.clientes.findMany();
        span.addEvent('Consulta executada com sucesso');

        // Registra a duração da consulta
        const duration = Date.now() - startTime;
        queryDurationHistogram.record(duration, {
            'db.system': 'mysql',
            'db.operation': 'select',
        });



        return users;
    } catch (error) {
        span.setStatus({ code: SpanStatusCode.ERROR, message: (error as any).message });
        throw error;
    } finally {
        span.end(); // finalize o span
    }
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