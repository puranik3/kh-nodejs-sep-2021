// logFunction is a "callback function" (it gets called back with the result of the operation)
function sum( x , y, logFunction ) {
    if( typeof x !== 'number' || typeof y !== 'number' ) {
        const error = new Error( 'both arguments must be numbers' );
        logFunction( error, undefined );
        return;
    }

    setTimeout(() => {
        const result = x + y;
        // return result;
        logFunction( null, result );
    }, 1000);
}

sum( 12, 'Thirteen', ( error, result ) => {
    if( error ) {
        console.error( error.message );
        return;
    }

    console.log( result )
});

sum( 14, 15, ( error, result ) => {
    if( error ) {
        console.error( error.message );
        return;
    }
    
    console.log( result * result )
});