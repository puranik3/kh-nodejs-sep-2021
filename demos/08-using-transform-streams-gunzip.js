const fs = require( 'fs' );
const path = require( 'path' );
const zlib = require( 'zlib' );

const rs = fs.createReadStream( path.join( __dirname, '..', 'nodejs-exercise-mysql.pdf.zip' ) );
const ws = fs.createWriteStream( path.join( __dirname, '..', 'nodejs-exercise-mysql.copy.pdf' ) );
const decompress = zlib.createGunzip(); // transform stream

// starts reading from rs stream and writes to compress stream little-by-little
// compress stream gzips the contents and exposes it - this is then read and written to ws
rs.pipe( decompress ).pipe( ws );

rs.on( 'error', error => {
    console.error( error.message );
});

ws.on( 'error', error => {
    console.error( error.message );
});

decompress.on( 'error', error => {
    console.error( error.message );
});