console.log( 1 );

// setTimeout is used to schedule functions for execution, after some delay
// after 1 second the function is eligible for execution
// non-blocking function
setTimeout(() => { // f
    console.log( 2, "f" );
}, 1000);

console.log( 3 );

setTimeout(() => { // g
    console.log( 4, "g" );
}, 0);

console.log( 5 );

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