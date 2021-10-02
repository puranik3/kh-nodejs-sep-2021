const http = require( 'http' );
const url = require( 'url' );
const fs = require( 'fs' );
const path = require( 'path' );

// const router = express.Router();
// router.get( '/univerisities', handler1 );
// router.get( '/admissions', handler2 );

// the callback is set to be called on the 'request' event
const server = http.createServer();

server.on( 'request', ( req, res ) => {
    const ws = fs.createWriteStream( path.join( __dirname, 'messages.json' ), { encoding : 'utf-8', flags: 'a' } );
    const urlParts = url.parse( req.url );

    // let body = '';

    // req.on( 'data', chunk => {
    //     body += chunk;
    // });

    // req.on( 'end', () => {
    //     console.log( 'finished reading the request body' );
    //     console.log( body );
    // });

    // req is a read stream, and ws is a write stream
    req.pipe( ws );

    res.statusCode = 201;
    res.setHeader( 'Content-Type', 'text/plain' );

    res.write( 'How to make sense of the incoming request' );
    res.write( '\nreq.method = ' + req.method );
    res.write( '\nreq.url = ' + req.url );

    res.write( 'urlParts (ie. url.parse( req.url)) =' + JSON.stringify( urlParts, null, 4 ) );
    res.write( 'urlParts.query = ' + urlParts.query );
    res.write( 'urlParts.pathname = ' + urlParts.pathname );

    res.end();
});

server.on( 'error', error => {
    console.error( error.message );
});

server.on( 'listening', () => {
    console.log( 'server running on port 3000' );
});

server.listen( 3000 );