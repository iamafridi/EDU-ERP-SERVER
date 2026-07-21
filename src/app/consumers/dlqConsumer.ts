import { kafka, publish } from '../utils/eventBus';
import { AuditLog } from '../modules/auditLog/auditLog.model';

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function startDLQConsumer(): Promise<void> {
  if (!process.env.KAFKA_BROKERS) return;

  const consumer = kafka.consumer({ groupId: 'dlq-handler' });
  await consumer.connect();
  await consumer.subscribe({ topic: 'erp.dlq.all', fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const event = JSON.parse(message.value!.toString());
        const retryCount = event.metadata?.retryCount || 0;

        if (retryCount < 3) {
          const delays = [10, 60, 300];
          await sleep(delays[retryCount] * 1000);
          await publish(event.data.originalTopic, {
            ...event.data.originalMessage,
            metadata: { retryCount: retryCount + 1 },
          });
        } else {
          await AuditLog.create({
            action: 'CREATE',
            resource: 'dlq:failed',
            resourceId: event.data.originalTopic,
            diff: {
              originalMessage: event.data.originalMessage,
              error: event.data.error,
            },
            timestamp: new Date(),
          });
        }
      } catch (err) {
        console.error('DLQ consumer error:', err);
      }
    },
  });
}
