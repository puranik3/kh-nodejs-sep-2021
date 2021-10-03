console.log( 1 );

// setTimeout is used to schedule functions for execution, after some delay
// after 1 second the function is eligible for execution
// non-blocking function
setTimeout(() => { // f
    console.log( 2, "f" );

    setTimeout(() => { // g
        console.log( 3, "g" );
    }, 1000);
}, 1000);

console.log( 4 );

// CPU-intensive tasks are to be avoided
for( let i = 0; i < 1e6; i++ ) {
    for( let j = 0; j < 1e4; j++ ) {
        ;
    }    
}

// Event queue : A queue of function waiting to be executed
// After 0 seconds the event queue looks like...
// ---------------
// | (g, args)
// ---------------
// 
// Right after the console.log( 5 ) executes, the function is executed
// g( args )
//
// After 1 second the event queue looks like...
// ---------------
// | (f, args)
// ---------------
// f( args )