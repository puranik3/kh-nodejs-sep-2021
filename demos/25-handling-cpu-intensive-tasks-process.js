const { fork } = require( 'child_process' );

const http = require( 'http' );
const url = require( 'url' );

// function sum( number ) {
//     for( var i = 1, sum = 0; i <= number; i++ ) {
//         sum += i;
//     }
//     return sum;
// }

let server = http.createServer( ( req, res ) => {
    let number = +url.parse( req.url, true ).query.number;

    // const result = sum( number );
    const child = fork( './25-child' );

    child.on( 'message', msg => {
        res.end( msg.sum.toString() );
    });

    child.send({
        number: number
    });

});

let port = process.env.port || 3000;
server.listen( port, ( err ) => {
    if( err ) throw err;
    console.log( 'server started on port ' + port );
}); 