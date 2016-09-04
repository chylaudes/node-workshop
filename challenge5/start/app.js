var express = require('express'),
    http = require('http'),
    path = require('path');

var app = express();

app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
    app.use(express.errorHandler());
});

// Set up express
var server = http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

// Set up socket.io
var io = require('socket.io').listen(server);

// Handle socket traffic
io.sockets.on('connection', function (socket) {
    // Relay chat data to all clients
    socket.on('username', function(username){ //listening for the "username" connection
    console.log("firstlevel",username);
      socket.set('username', username); // persistent cookie, like storing a value throughout
    });
    socket.on('chat', function(data) {
      socket.get('username', function(err, username) {
        console.log("2ndlevel",username);

        var user = err ? "Anon" : username;
        console.log("user", user);
        var payload = {
          message: data.message,
          username: user
        };

        // io.sockets.emit('chat', payload); //condenses the last two lines of code


        socket.emit('chat', payload); // this will write back
        socket.broadcast.emit('chat', payload); // this will broadcast all connected clients

      });

    });
});
