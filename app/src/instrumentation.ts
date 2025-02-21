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
    url: 'http://otel-collector:4317',
  }),

  instrumentations: [
    new HttpInstrumentation({
      requestHook: (span, request) => {
        if ('headers' in request) {
          const incomingRequest = request as IncomingMessage;
          if (incomingRequest.headers['x-request-id']) {
            span.setAttribute('http.request_id', incomingRequest.headers['x-request-id']);
          }
        }
      },
      responseHook: (span, response) => {
 
        if (response.statusCode !== undefined) {
          span.setAttribute('http.status_code', response.statusCode);
        }
        if (response.statusCode !== undefined && response.statusCode >= 400) {
          span.setStatus({ code: SpanStatusCode.ERROR });
        }
      }
    }),
    new KnexInstrumentation()
  ],

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
