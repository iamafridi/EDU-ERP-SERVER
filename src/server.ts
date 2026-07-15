import mongoose from 'mongoose';
import config from './app/config';
import app from './app';
import { Server } from 'http'
import { initSocket } from './app/utils/socket';
import { setupSwagger } from './app/utils/swagger';
import { seedDemoData } from './app/seed';
import { disconnectProducer } from './app/utils/eventBus';

let server: Server;

async function main() {
  try {

    await mongoose.connect(config.database_url as string);
    await seedDemoData();
    server = app.listen(config.port, () => {
      console.log(`Application is listening on port ${config.port}`);
    });
    initSocket(server);
    if (config.NODE_ENV !== 'production') {
      setupSwagger(app);
    }

    if (process.env.KAFKA_BROKERS) {
      const { startAuditConsumer } = await import('./app/consumers/auditConsumer');
      const { startFeeConsumer } = await import('./app/consumers/feeConsumer');
      const { startDLQConsumer } = await import('./app/consumers/dlqConsumer');
      await Promise.all([
        startAuditConsumer(),
        startFeeConsumer(),
        startDLQConsumer(),
      ]);
      console.log('Kafka consumers started');
    }
  } catch (err) {
    console.error(err);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log(`UnhandledRejection is detected, shutting down.....`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`UncaughtException is detected, shutting down.....`);
  process.exit(1);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  await disconnectProducer().catch(() => {});
  if (server) {
    server.close(() => {
      process.exit(0);
    });
  }
  process.exit(0);
});