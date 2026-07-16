import { Kafka, Producer } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'medical-erp',
  brokers: process.env.KAFKA_BROKERS?.split(',') || ['localhost:9092'],
});

let producer: Producer | null = null;

export async function publish(
  topic: string,
  event: {
    type: string;
    source: string;
    data: Record<string, unknown>;
    metadata?: Record<string, unknown>;
  },
): Promise<void> {
  if (!producer) {
    producer = kafka.producer();
    await producer.connect();
  }

  await producer.send({
    topic,
    messages: [
      {
        key: String(event.data.studentId || event.data.userId || 'system'),
        value: JSON.stringify({
          ...event,
          timestamp: new Date().toISOString(),
          correlationId: crypto.randomUUID(),
        }),
      },
    ],
  });
}

export async function disconnectProducer(): Promise<void> {
  if (producer) {
    await producer.disconnect();
    producer = null;
  }
}

export { kafka };
