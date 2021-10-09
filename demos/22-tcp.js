/**
 * Instructions:
 * 1. Require the net module and call its createServer() method to create a TCP server.
 * 2. Use server.listen() to start server on a specified port.
 * 3. The server listens for a 'connection' event and receives a socket in the callback. You can create a TCP connection to server using netcat.
 * ```
 * nc localhost 8000
 * ```
 * 4. You can respond to the connection using socket.write() passing it a string.
 * 5. Setup 'data' event handler on the socket - write back data buffer received (interpreting it as 'utf8' (which can be passed as second parameter to socket.write())).
 * 6. Setup 'end' event handler on the socket (fired on client disconnection) - log a message
 */
const net = require( 'net' );
const server = net.createServer();

server.on( 'connection', ( socket ) => {
    let name;
    socket.write( 'Hello, who is this?' );

    socket.on( 'data', ( data ) => {
        let message = data.toString( 'utf-8' );
        
        if( !name ) {
            name = message.trim();

            socket.write( 'Hi ' + name );
            return;
        }

        
        socket.write( 'Hi ' + name + '\n' + data );
    });

    socket.on( 'end', () => {
        console.log( name + ' has disconnected' );
    });
});

server.listen( 8000 );
server.on( 'listening', () => {
    console.log( 'tcp server has started listening on port 8000' );
});