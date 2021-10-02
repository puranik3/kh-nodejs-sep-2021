// readFile() is better than readFileSync()
// readFile( '', ( error, contents ) => {} ) - memory is not bounded (may grow as large files are read)

// streaming approach to reading files
// we read the file in streaming approach chunk-by-chunk
const fs = require( 'fs' );
const path = require( 'path' );

// we are creating a "Read stream" - a means to read the contents of the file chunk-by-chunk
// const rs = fs.createReadStream( path.join( __dirname, '..', 'topics.md' ), { encoding: 'utf-8' } );
const rs = fs.createReadStream( path.join( __dirname, '..', 'nodejs-exercise-mysql.pdf' ), { encoding: 'utf-8' } );

let numChunksRead = 0;

// data event is emitted when a chunk is read
rs.on( 'data', ( chunk ) => {
    numChunksRead++;
    console.log( 'data event' );
    if( numChunksRead >= 2 ) {
        rs.destroy(); // rs.pause();
    }
    // console.log( chunk );
});

rs.on( 'close', ( error ) => {
    console.error( error );
});

rs.on( 'end', () => {
    console.log( '*** end of file read ***' );
});

rs.on( 'error', ( error ) => {
    console.error( error.message );
});

// start reading from the file
rs.read();