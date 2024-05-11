import { Server as SocketIOServer } from 'socket.io';
import server from '../index.js';

const io = new SocketIOServer(server);

io.on('connection', (socket) => {

    console.log('connection secured!')

    socket.on('all-users', async (data) => {
        io.emit('online-users', data.uid)
    });
    
})