const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const routes = require('./routes');
const cors = require('cors');

const port = (process.env.PORT || 3000);
const app = express();
corsUris = [ "http://localhost:4200", "https://mainly-music-ui.herokuapp.com" ]

app.use(cors({ origin: corsUris }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    let validIps = process.env.IPS?.split(',') || ['::12', '127.0.0.1']; // Put your IP whitelist in this array
    console.log(validIps);
    if(validIps.includes(req.socket.remoteAddress)){
        // IP is ok, so go on
        console.log("IP ok");
        next();
    }
    else{
        // Invalid ip
        console.log("Bad IP: " + req.socket.remoteAddress);
        const err = new Error("Bad IP: " + req.socket.remoteAddress);
        next(err);
    }
})
app.use('/api', routes);

require('./mongo');

const server = http.Server(app);
const socketIO = require('socket.io');
const io = socketIO(server, {
    cors: {
        origin: corsUris
    }
});

io.on('connection', (socket) => {
    socket.on('sessionupdated', (session) => {
        io.emit('sessionupdated', session)
    });

    socket.on('personupdated', (person) => {
        io.emit('personupdated', person)
    });
});



server.listen(port, () => console.log(`API running on localhost:${port}`));