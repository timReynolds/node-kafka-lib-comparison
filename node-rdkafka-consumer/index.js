const Kafka = require("node-rdkafka");
const { BROKER, TOPIC } = require("../constants");

// https://github.com/Blizzard/node-rdkafka/blob/master/examples/consumer-flow.md
const consumer = new Kafka.KafkaConsumer(
  {
    // debug: "consumer,cgrp,topic,fetch",
    // debug: "cgrp",
    "group.id": "node-rdkafka-consumer",
    "metadata.broker.list": [BROKER],
    "partition.assignment.strategy": "cooperative-sticky",
    // "group.instance.id": process.env.INSTANCE_ID,
  },
  {}
);

//logging debug messages, if debug is enabled
consumer.on("event.log", function (log) {
  console.log(log.message);
});

//logging all errors
consumer.on("event.error", function (err) {
  console.error("Error from consumer");
  console.error(err);
});

consumer.on("ready", function (arg) {
  console.log("consumer ready." + JSON.stringify(arg));

  consumer.subscribe([TOPIC]);
  //start consuming messages
  consumer.consume();
});

consumer.on("data", function (m) {
  console.log(
    "node-rdkafka-consumer",
    m.topic,
    m.partition,
    m.offset,
    m.value.toString("utf8")
  );
  consumer.commit(m);
});

consumer.on("disconnected", function (arg) {
  console.log("consumer disconnected. " + JSON.stringify(arg));
});

//starting the consumer
consumer.connect();

function shutdown() {
  consumer.disconnect(function () {
    process.exit();
  });
}

process.once("SIGTERM", shutdown);
process.once("SIGINT", shutdown);
process.once("SIGHUP", shutdown);
