const fs = require( 'fs' );
const path = require( 'path' );

const rs = fs.createReadStream( path.join( __dirname, '..', 'nodejs-exercise-mysql.pdf' ) );
const ws = fs.createWriteStream( path.join( __dirname, '..', 'nodejs-exercise-mysql.copy.pdf' ) );

// starts reading from rs stream and writes to ws stream little-by-little
rs.pipe( ws );

rs.on( 'error', error => {
    console.error( error.message );
});

ws.on( 'error', error => {
    console.error( error.message );
});