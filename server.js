const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("User Connected");
    socket.on('book_update', function(data){
        console.log(data);
        socket.broadcast.emit("book_update", data);
    });
});

server.listen(8001, () => {
    console.log("SOCKET SERVER IS RUNNING");
});

app.get("/", (request, response) => {
    console.log(request);
    response.sendStatus(200);
});

