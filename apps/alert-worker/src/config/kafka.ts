import { Consumer, Kafka } from "kafkajs";
import { env } from "./env";

const kafka = new Kafka({
  clientId: env.KAFKA_CLIENT_ID,
  brokers: env.KAFKA_BROKERS,
});

export const consumer: Consumer = kafka.consumer({
  groupId: env.KAFKA_GROUP_ID,
});

export async function connectConsumer(): Promise<void> {
  await consumer.connect();
  await consumer.subscribe({
    topic: env.KAFKA_TOPIC_TELEMETRY,
    fromBeginning: true,
  });

  console.log("Kafka consumer connected successfully");
}
