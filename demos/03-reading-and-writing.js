const fs = require( 'fs' );
const path = require( 'path' );

const rs = fs.createReadStream( path.join( __dirname, 'hello.html' ) );
const ws = fs.createWriteStream( path.join( __dirname, 'hello.copy.html' ) );

rs.on( 'data', ( chunk ) => {
    ws.write( chunk );
});

rs.on( 'end', () => {
    ws.end();
});

rs.on( 'error', error => {
    console.error( error.message );
});

ws.on( 'error', error => {
    console.error( error.message );
});

rs.read();