import { Kafka, Producer } from "kafkajs";
import { env } from "./env";

const kafka = new Kafka({
  clientId: env.KAFKA_CLIENT_ID,
  brokers: env.KAFKA_BROKERS,
});

export const producer: Producer = kafka.producer();

export async function connectProducer(): Promise<void> {
  await producer.connect();
  console.log("Kafka producer connected successfully");
}
