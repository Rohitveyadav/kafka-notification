const { kafka } = require('./kafka-connection');
require('dotenv').config();

async function init() {
    try {
        const admin = kafka.admin();
        await admin.connect();
        console.log("Admin connection successfully done.");

        await admin.createTopics({
            topics: [{ topic: process.env.TOPIC, numPartitions: 2 }]
        });
        console.log("Topic creation successfully done.");
        await admin.disconnect();
    } catch (error) {
        console.error("Error during initialization:", error);
    } 
}

init();
