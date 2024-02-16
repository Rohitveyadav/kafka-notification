const { kafka } = require('./kafka-connection');
require('dotenv').config();

async function init() {
    try {
        const producer = kafka.producer();
        
        await producer.connect();
        console.log("Producer connected successfully");

        await producer.send({
            topic: process.env.TOPIC,
            messages: [
                { partition: 0, key: "location", value: 'Hello KafkaJS user!' },
            ],
        });

        console.log("Message produced successfully");
        await producer.disconnect();
    } catch (error) {
        console.error('Error initializing Kafka producer:', error.message);
    } 
}

init();
