import { Server } from 'socket.io';
import server from '../index.js';

const io = new Server(server);

io.on('connection', (socket) => {

    socket.on('all-users', async (data) => {
        io.emit('online-users', data.uid)
    });
    
})