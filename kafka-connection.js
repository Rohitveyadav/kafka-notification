const { Kafka } = require('kafkajs');
require('dotenv').config();


try {
  exports.kafka = new Kafka({
    clientId: 'VEHICLE_TRACKING',
    brokers: [`${process.env.PRIVATE_IP}:${process.env.PORT}`],
  });
} catch (error) {
  console.error('Error creating Kafka instance:', error);
}
