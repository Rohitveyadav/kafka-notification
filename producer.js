const { kafka } = require('./kafka-connection');
const readline = require('readline');
require('dotenv').config();

const rl =  readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

async function init() {
    try {
        const producer = kafka.producer();
        
        await producer.connect();
        console.log("Producer connected successfully");

        rl.setPrompt('>');
        rl.prompt();

        rl.on('line', async function(line){
            const [type,location] =  line.split(' ');
            await producer.send({
                topic: process.env.TOPIC,
                messages: [
                    { partition: type.toLowerCase() === 'car' ? 0 : 1, key: `${location}`, value: `hello....${type}` },
                ],
            });
        }).on('close',async ()=>{
            console.log("Message produced successfully");
            await producer.disconnect();
        })
        
    } catch (error) {
        console.error('Error initializing Kafka producer:', error.message);
    } 
}

init();
