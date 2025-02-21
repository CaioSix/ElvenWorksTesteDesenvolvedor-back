import { NodeSDK } from '@opentelemetry/sdk-node';
import { IncomingMessage } from 'http';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { KnexInstrumentation } from '@opentelemetry/instrumentation-knex';
import { PeriodicExportingMetricReader, ConsoleMetricExporter } from '@opentelemetry/sdk-metrics';
import { diag, DiagConsoleLogger, DiagLogLevel, SpanStatusCode } from '@opentelemetry/api';

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);

const sdk = new NodeSDK({
  serviceName: 'clients-api',
  traceExporter: new OTLPTraceExporter({
    // Se estiver rodando em container, utilize o hostname do otel-collector.
    url: 'http://otel-collector:4317',
  }),
  // Aqui configuramos a instrumentação HTTP para adicionar atributos customizados
  // e marcar spans como erro, se a resposta indicar problema.
  instrumentations: [
    new HttpInstrumentation({
      requestHook: (span, request) => {
        // Exemplo: adicionar um ID de requisição se houver
        if ('headers' in request) {
          const incomingRequest = request as IncomingMessage;
          if (incomingRequest.headers['x-request-id']) {
            span.setAttribute('http.request_id', incomingRequest.headers['x-request-id']);
          }
        }
      },
      responseHook: (span, response) => {
        // Já é coletado automaticamente o código HTTP,
        // mas podemos reforçar ou adicionar informações.
        if (response.statusCode !== undefined) {
          span.setAttribute('http.status_code', response.statusCode);
        }
        // Se o status for 400 ou superior, marca o span como erro.
        if (response.statusCode !== undefined && response.statusCode >= 400) {
          span.setStatus({ code: SpanStatusCode.ERROR });
        }
      }
    }),
    new KnexInstrumentation()
  ],
  // Configuração de métricas: essas métricas serão exportadas para o console.
  // Para visualizá-las em outro backend, troque o exporter conforme necessário.
  metricReader: new PeriodicExportingMetricReader({
    exporter: new ConsoleMetricExporter(),
    exportIntervalMillis: 60000,
  }),
});

process.on('beforeExit', async () => {
  await sdk.shutdown();
});

export const inicializeTracing = async () => {
  await sdk.start();
};
