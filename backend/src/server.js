
const http = require('http').createServer();
const io = require('socket.io')(http);

http.listen(3000, function(){
    console.log('listening on *:3000');
});

let count = 0;
io.on('connection', socket => {
    console.log('new user');
    count++;
    io.emit('newUser', count);

    socket.on('disconnect', function(){
        count--;
        io.emit('disUser', count);
		console.log('user disconnected');
      });
});






