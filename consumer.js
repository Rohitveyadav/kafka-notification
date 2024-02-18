const { kafka } = require('./kafka-connection');
require('dotenv').config();
const group = process.argv[2];

async function init() {
    try {
        const consumer = kafka.consumer({ groupId: group });

        await consumer.connect();
        await consumer.subscribe({ topics: [`${process.env.TOPIC}`], fromBeginning: true });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log(`${group} [${topic}]:PART:${partition},MESSAGE:${message.value.toString()}`);
            },
        });
    } catch (error) {
        console.error('Error initializing Kafka consumer:', error.message);
    }
}

init();
