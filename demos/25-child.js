function sum( number ) {
    for( var i = 1, sum = 0; i <= number; i++ ) {
        sum += i;
    }
    return sum;
}

process.on( 'message', msg => {
    const result = sum( msg.number );

    process.send({
        sum: result
    });
});