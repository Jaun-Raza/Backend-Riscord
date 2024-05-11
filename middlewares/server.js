import express from 'express';

const server = express();

// server.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// })

server.use(express.json({ limit: '1024mb' }));
server.use(express.urlencoded({ extended: true }));

export default server;