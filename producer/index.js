const { Kafka } = require("kafkajs");
const { BROKER, TOPIC } = require("../constants");

const kafka = new Kafka({
  clientId: "example-producer",
  brokers: [BROKER],
});

const producer = kafka.producer();

async function main() {
  await producer.connect();

  while (true) {
    console.log("Sending message...");
    await producer.send({
      topic: TOPIC,
      messages: [{ value: "Hello Kafka!" }],
    });

    await new Promise((resolve) => setTimeout(resolve, 200));
  }
}

main();
