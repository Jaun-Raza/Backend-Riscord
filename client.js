import { createClient } from 'redis';
import 'dotenv/config';

export const client = createClient({
    password: process.env.REDIS_PASS,
    socket: {
        host: process.env.REDIS_HOST,
        port: 18470
    }
});

client.connect().then(() => {
    console.log('Redis Connected Successfully!');
}).catch(err => {
    console.log('Redis Error', err)
})