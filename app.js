var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');
var mysql = require('mysql');

var client = mysql.createConnection({
  user: 'root',
  password: '1234',
  database: 'node'
});

var server = http.createServer(function (request, response){
  fs.readFile('HTMLPage.html', function (error, data){
    response.writeHead(200, { 'Content-Type': 'text/html'});
    response.end(data);
  });
}).listen(52273, function () {
  console.log('Server Running at http://127.0.0.1:52273');
});


var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket){
  socket.on('message', function (data) {
    client.query('INSERT INTO chat (name, message) VALUES (?, ?)', [ data.name, data.message ]);
    io.sockets.emit('message', data);
  });
});
