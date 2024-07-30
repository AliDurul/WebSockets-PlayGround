const express = require('express')
const app = express()
const server = require('http').createServer(app)
const { Server } = require('socket.io')



app.use(require('cors')())

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

io.on('connection', socket => {
    console.log(`User connected: ${socket.id}`);

    socket.on('joinRoom', room => {
        socket.join(room)
        console.log(`User ${socket.id} joined room ${room}`)
    })

    socket.on('sendMsg', data => {
        socket.to(data.room).emit('receiveMsg', data.msgText)
    })
})

server.listen(8000, () => console.log('server is running'))