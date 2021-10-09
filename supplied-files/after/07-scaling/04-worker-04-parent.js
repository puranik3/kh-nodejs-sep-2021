/**
 * One network request which takes a long time to process (huge number passed in below case) will NOT block a subsequent network request (since a separate process does the long running computation now)
 * 
 * How to execute:
 * Make simultaneous HTTP requests or use curl ```curl localhost:3000/?number=10000000000```, ```curl localhost:3000/?number=1000000000``` etc.
 */
const { Worker } = require( 'worker_threads' );
const http = require( 'http' );
const url = require( 'url' );

function sum( number ) {
    for( var i = 1, sum = 0; i <= number; i++ ) {
        sum += i;
    }
    return sum;
}

let server = http.createServer( ( req, res ) => {
    let number = +url.parse( req.url, true ).query.number;
    
    // non-blocking (good)
    const worker = new Worker( './04-worker-04-child-worker-thread.js', {
        workerData: number
    });

    worker.once( 'message', msg => {
        res.end( msg.sum.toString() );
    });

    // blocking operation (CPU-intensive)
    // res.end( '' + sum( number ) );
});

let port = process.env.port || 3000;
server.listen( port, ( err ) => {
    if( err ) throw err;
    console.log( 'server started on port ' + port );
}); 
