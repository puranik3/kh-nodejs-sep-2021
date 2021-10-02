const fs = require( 'fs' );
const path = require( 'path' );

const rs = fs.createReadStream( path.join( __dirname, '..', 'nodejs-exercise-mysql.pdf' ) );
const ws = fs.createWriteStream( path.join( __dirname, '..', 'nodejs-exercise-mysql.copy.pdf' ) );

// "backpressure" problem
// read will happen at much faster pace than actual write to file (thus the internal write buffer may grow in size without bounds)
rs.on( 'data', ( chunk ) => {
    console.log( 'one chunk was read and will be written' );
    const ok = ws.write( chunk ); // if ok = false then writes are happening very fast

    if( !ok ) {
        rs.pause(); // stop reading

        ws.once( 'drain', () => {
            rs.resume();
        });
    }
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