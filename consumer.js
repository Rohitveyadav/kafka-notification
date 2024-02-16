const { kafka } = require('./kafka-connection');
require('dotenv').config();

async function init() {
    try {
        const consumer = kafka.consumer({ groupId: 'my-group' });

        await consumer.connect();
        await consumer.subscribe({ topics: [`${process.env.TOPIC}`], fromBeginning: true });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log(`[${topic}]:PART:${partition},MESSAGE:${message.value.toString()}`);
            },
        });
    } catch (error) {
        console.error('Error initializing Kafka consumer:', error.message);
    }
}

init();
