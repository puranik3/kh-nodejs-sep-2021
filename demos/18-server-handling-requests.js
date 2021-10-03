const http = require( 'http' );
const url = require( 'url' );
const fs = require( 'fs' );
const path = require( 'path' );

const server = http.createServer();

server.on( 'request', ( req, res ) => {
    // good way
    const ws = fs.createWriteStream( path.join( __dirname, 'messages.json' ), { encoding : 'utf-8', flags: 'a' } );
    
    // bad way to write to a file - blocks the rest of request callbacks from being executed
    // fs.writeFileSync()
    const urlParts = url.parse( req.url );

    req.pipe( ws );

    res.end( 'Data will be saved' );
});

server.on( 'error', error => {
    console.error( error.message );
});

server.on( 'listening', () => { // goes through the event queue, and gets picked up immediately
    console.log( 'server running on port 3000' );
});

server.listen( 3000 );

console.log( 'end of script' );