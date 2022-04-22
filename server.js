const express = require("express");
const https = require("https");
const fs = require( 'fs' );

const app = express();

const options = {
    key: fs.readFileSync('/etc/ssl/sslcs/cloudstaff.key'),
    cert: fs.readFileSync('/etc/ssl/sslcs/cloudstaff.crt'),

    requestCert: false,
    rejectUnauthorized: false
}

const server = https.createServer(options, app);

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

