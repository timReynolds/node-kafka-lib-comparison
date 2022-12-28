const Kafka = require("no-kafka");
const Promise = require("bluebird");
const consumer = new Kafka.GroupConsumer({
  groupId: "no-kafka-consumer-group",
});
const { TOPIC } = require("../constants");

var dataHandler = function (messageSet, topic, partition) {
  return Promise.each(messageSet, function (m) {
    console.log(
      "no-kafka-consumer",
      topic,
      partition,
      m.offset,
      m.message.value.toString("utf8")
    );

    return consumer.commitOffset({
      topic: topic,
      partition: partition,
      offset: m.offset,
    });
  });
};

var strategies = [
  {
    subscriptions: [TOPIC],
    handler: dataHandler,
  },
];

consumer.init(strategies);
