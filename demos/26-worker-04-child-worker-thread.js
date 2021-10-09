const { workerData, parentPort } = require( 'worker_threads' );

// potentially long computation
function sum( number ) {
    for( var i = 1, sum = 0; i <= number; i++ ) {
        sum += i;
    }
    return sum;
}
const number = workerData;

parentPort.postMessage({
    sum: sum( number )
});