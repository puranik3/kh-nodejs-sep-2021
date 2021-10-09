const express = require( 'express' );
const http = require( 'http' );
const path = require( 'path' );

app = express();
const server = http.createServer( app ); // to associate the Express app object with our web server

const io = require( 'socket.io' ).listen( server );

app.use( express.static( ( path.join( __dirname, 'public' ) ) ) );

app.set( 'view engine', 'ejs' );
app.set( 'views', path.join( __dirname, 'views' ) );

app.get( '/', function( req, res ) {
    res.render( 'index' );
});

const PORT = process.env.PORT || 3000;
server.listen( PORT, function( err ) {
    if( err ) {
        console.log( 'error starting server' );
    } else {
        console.log( 'server started on port ' + PORT );
    }
});

// we sill be maintaining all client connection using the users object
const users = { };

// when client is trying to establish socket connection
// socket object represents a logical connection between client and server
// all communication will happend over the socket
io.sockets.on( 'connection', function( socket ) {
    socket.on( 'new user', function( data, callback ) {
        console.log( 'new user ' + data );
        const nickname = data;
        if( nickname in users ) {
            callback( false );
        } else {
            socket.nickname = nickname;
            users[nickname] = socket;
            callback( true );
            updateNicknames(); // notify users of the latest list if users
        }
    });

    // called when a tab window closes
    socket.on( 'disconnect', function( data ) {
        if( !socket.nickname ) {
            return
        }

        delete users[socket.nickname]; // remove the user

        updateNicknames(); //notify all users of updated list of users
    });

    socket.on( 'message-to-be-sent', function( data, callback ) {
        console.log( data );
        data = data.trim();

        if( data.substr( 0, 1 ) === '@' ) {
            const idxFirstSpace = data.indexOf( ' ' );
            const receiverNickname = data.substr( 1, idxFirstSpace ).trim();
            const message = data.substr( idxFirstSpace + 1 );

            console.log( 'receiverNickname = ', receiverNickname );
            console.log( 'Object.keys( users ) = ', Object.keys( users ) );

            if( idxFirstSpace === -1 ) {
                console.log( 1 );
                callback( 'You forgot to mention the message for user' );    
            } else {
                if( receiverNickname in users ) {
                    console.log( 2 );
                    // send message to the receiver
                    users[receiverNickname].emit( 'incoming message', {
                        message: message,
                        sender: socket.nickname
                    });
                    
                    // send a notification to sender
                    callback({
                        message: message,
                        receiver: receiverNickname
                    });
                } else {
                    console.log( 3 );
                    callback( 'User with given nickname does not exist' );
                }
            }
        } else {
            console.log( 4 );
            callback( 'You forgot to mention the nickname of user' );
        }
    });
});

function updateNicknames() {
    console.log( 'updating nickname ' );
    console.log( Object.keys( users ) );
    // calling emit() on io.sockets will broadcase message to all connections
    // Note: Calling emit() on a socket OTOH will send only to the particular socket
    io.sockets.emit( 'nicknames', Object.keys( users) );
}

