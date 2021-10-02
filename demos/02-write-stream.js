// writeFile( '' , contents ) we write the entire contents in one go
const fs = require( 'fs' );
const path = require( 'path' );

// res.write( 'Hello' )
const ws = fs.createWriteStream( path.join( __dirname, 'hello.html' ), /*{ flags: 'a' } */ );

ws.on( 'drain', () => {
    console.log( 'contents have been written and there is nothing else to write' );
});

ws.on( 'error' , error => {
    console.error( error.message );
});

// asynchrnous write
ws.write( 
    `
    <!doctype html>
    <html>
    `,
    function done( error ) {
        if( error ) {
            console.error( error.message );
            return;
        }
        
        console.log( 'first chunk was written' );
    }
);
  
ws.write(
    `
        <head>
            <title>Hello, write stream</title>
        </head>
    `
);

ws.write(
    `
        <body>
            <h1>Writable streams</h1>
            <p>
                Writable stream supports writing to the destination little-by-little
            </p>
        </body>
    </html>
    `
);

// close the file - we cannot write after this
ws.end();