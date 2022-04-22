const express = require("express");
const https = require("https");

const app = express();
const server = https.createServer(app);

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

server.listen(5000, () => {
    console.log("SOCKET SERVER IS RUNNING");
});

app.get("/", (request, response) => {
    console.log(request);
    response.sendStatus(200);
});

