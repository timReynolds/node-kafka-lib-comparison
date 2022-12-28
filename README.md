# node-kafka-lib-comparison

Node kafka library comparison for consumers, focusing on rdkafka's ability to support cooperative rebalance unlike other implmentations.

Before you can spin up multiple consumers using different libs you'll need to;

1. Start kafka;

```
docker-compose up
```

2. Create topic

```
docker exec broker \
kafka-topics --bootstrap-server broker:9092 \
             --create \
             --topic example-topic \
             --partitions 12
```

Then you can start many consumers;

- `node node-rdkafka-consumer/index.js` (cooperative rebalanced)
- `node no-kafka-consumer/index.js` (round robin, stop the world)
