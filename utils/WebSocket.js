const express = require('express')
const app = express();
const port = 5200 // setting the port
const server = app.listen(port);

const { Server } = require('socket.io');
const io = new Server(server, { cors: { origin: '*' } });

let clients = []
var Socket = {
    emit: function (event, data) {
        console.log(event, data);
        let socket_id = Array.from(io.sockets.sockets.keys())
        // io.emit(event, data);      
        io.to(socket_id).emit(event, data);  
     
    }
};

io.on("connection", function (socket) {
    console.log("A user connected to socket id", socket.id); 
});

console.log(clients)
exports.Socket = Socket;