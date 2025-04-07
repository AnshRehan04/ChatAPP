// const express = require("express");
// const http = require("http");
// const cors = require("cors");
// const { Server } = require("socket.io");

// const app = express();
// const server = http.createServer(app);

// // Use CORS middleware before Socket.IO
// // app.use(cors());

// // const io = new Server(server, {
// //   cors: {
// //     origin: "http://localhost:5173",
// //     methods: ["GET", "POST"],
// //   },
// // });

// const io=new Server(server);

// app.get("/",(req,res)=>{
//   res.sendFile(__dirname+'/index.html');
// })
// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);
//   // socket.emit("Welcome", "Welcome to Server");
//   socket.on("message",(data)=>{
//     console.log("Message is ",data);
//     socket.emit("message from reciever",data);
//   })

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

// server.listen(5000, () => {
//   console.log("✅ Server running on port 5000");
// });


const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});