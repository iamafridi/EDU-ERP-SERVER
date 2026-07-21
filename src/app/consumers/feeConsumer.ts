import { kafka, publish } from '../utils/eventBus';

export async function startFeeConsumer(): Promise<void> {
  if (!process.env.KAFKA_BROKERS) return;

  const consumer = kafka.consumer({ groupId: 'fee-payment-group' });
  await consumer.connect();
  await consumer.subscribe({ topic: 'erp.fee.paid', fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const event = JSON.parse(message.value!.toString());

        if (event.type === 'fee.paid') {
          await publish('erp.notification.push', {
            type: 'notification.created',
            source: 'fee-consumer',
            data: { userId: event.data.studentId },
          });
        }
      } catch (err) {
        await publish('erp.dlq.all', {
          type: 'fee.payment.failed',
          source: 'fee-consumer',
          data: {
            originalTopic: 'erp.fee.paid',
            originalMessage: event,
            error: (err as Error).message,
          },
        });
      }
    },
  });
}
