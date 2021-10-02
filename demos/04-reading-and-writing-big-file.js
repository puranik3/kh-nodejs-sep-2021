const fs = require( 'fs' );
const path = require( 'path' );

const rs = fs.createReadStream( path.join( __dirname, '..', 'nodejs-exercise-mysql.pdf' ) );
const ws = fs.createWriteStream( path.join( __dirname, '..', 'nodejs-exercise-mysql.copy.pdf' ) );

// read will happen at much faster pace than actual write to file
rs.on( 'data', ( chunk ) => {
    console.log( 'one chunk was read and will be written' );
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