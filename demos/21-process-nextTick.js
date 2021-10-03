// logFunction is a "callback function" (it gets called back with the result of the operation)
function sum( x , y, logFunction ) {
    if( typeof x !== 'number' || typeof y !== 'number' ) {
        const error = new Error( 'both arguments must be numbers' );
        // we delay the call to the callback so that the order of execution of the callback is same as in success case
        // this is preferred to using setTimeout( fn, 0 ) as fn gets scheduled in the "current" queue (https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
        process.nextTick(() => {
            logFunction( error, undefined );
        });
        return;
    }

    setTimeout(() => {
        const result = x + y;
        // return result;
        logFunction( null, result );
    }, 1000);
}

sum( 12, 13, ( error, result ) => {
    if( error ) {
        console.error( 'callback function : ', error.message );
        return;
    }

    console.log( 'callback function : ', result )
});

console.log( 'end of script' );