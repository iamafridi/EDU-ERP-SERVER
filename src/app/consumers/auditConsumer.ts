import { kafka } from '../utils/eventBus';
import { AuditLog } from '../modules/auditLog/auditLog.model';

export async function startAuditConsumer(): Promise<void> {
  if (!process.env.KAFKA_BROKERS) return;

  const consumer = kafka.consumer({ groupId: 'audit-persist-group' });
  await consumer.connect();
  await consumer.subscribe({ topic: 'erp.audit.cud', fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const event = JSON.parse(message.value!.toString());
        await AuditLog.create({
          action: event.data.action,
          resource: event.data.resource,
          resourceId: event.data.resourceId,
          userId: event.data.userId,
          userRole: event.data.userRole,
          ip: event.data.ip,
          timestamp: new Date(event.timestamp),
        });
      } catch (err) {
        console.error('Audit consumer error:', err);
      }
    },
  });
}
