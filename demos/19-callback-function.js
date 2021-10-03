// logFunction is a "callback function" (it gets called back with the result of the operation)
function sum( x , y, logFunction ) {
    setTimeout(() => {
        const result = x + y;
        // return result;
        logFunction( result );
    }, 1000);

    return; // return undefined;
}

// this is what we would like to do once we have the result
function logResult( result ) {
    console.log( result );
}

function logSquareOfResult( result ) {
    console.log( result * result );
}

sum( 12, 13, logResult ); // log the result
sum( 14, 15, logSquareOfResult ); // log the square of the result