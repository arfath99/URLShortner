import fastify from 'fastify';

const app = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
  ajv: {
    customOptions: {
      coerceTypes: false,
      allErrors: true,
    },
  },
});

export default app;
