const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const routes = require('./routes');
const cors = require('cors');

const port = (process.env.PORT || 3000);
const app = express();

app.use(cors({ origin: [ "http://localhost:4200", "https://mainly-music-ui.herokuapp.com" ] }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', routes);

require('./mongo');

const server = http.Server(app);
const socketIO = require('socket.io');
const io = socketIO(server, {
    cors: {
        origin: 'https://mainly-music-ui.herokuapp.com'
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