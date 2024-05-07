const express = require('express');
const path = require('path');
const http = require('http');
const Socket = require('socket.io');

const app = express();

app.use(express.static(path.join(__dirname, '/public')));

const server = http.createServer(app);

const io = Socket(server);

io.on('connection', function (socket) {
    console.log('A user connected');

    socket.on('chat-message', function (data){
        
        io.emit('chat-message',  data);
    })

    socket.on('disconnect', function() {
        console.log('User disconnected');
    })
});



app.listen(3005,()=>{
    console.log('server started');
})