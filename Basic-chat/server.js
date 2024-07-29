const express = require('express');
const app = express();

app.use(express.static('public'));

const expressServer = app.listen(8000, () => { console.log('server running..'); });


const socketio = require('socket.io');

const io = socketio(expressServer, {
    cors: ['http://localhost:8000']
});

io.on('connect', socket => {
    // console.log(socket.handshake);
    // socket.emit('welcome', [1, 2, 3, 4])
    console.log(socket.id, ' has joined');

    socket.on('messagefromClient', newMsg => {
        console.log('message from client: ', newMsg)
        io.emit('messageFromServer', newMsg)
    })


})
