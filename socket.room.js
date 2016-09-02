var fs = require('fs');

var server = require('http').createServer();

server.listen(8000, function(){
	console.log('Server Running at http://localhost:8000');
});

server.on('request', function(req, res){
	/*test*/console.log('request Call');

	fs.readFile( 'catting.html', function(error, data){
		res.writeHead( 200, { 'Content-Type' : 'text/html' } );
		res.end( data );
	});
});

var io = require('socket.io').listen(server);

io.sockets.on( 'connection', function(socket){
	socket.on( 'join', function(data){
		console.log(data);
		socket.join(data);
		socket.room = data;
	});

	socket.on( 'message', function(data){		
		console.log( 'id : %s, msg : %s, date : %s', data.id, data.message, data.date );
		io.sockets.in( socket.room ).emit('message', data);
	});
});
