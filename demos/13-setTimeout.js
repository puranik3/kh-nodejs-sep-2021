console.log( 1 );

// setTimeout is used to schedule functions for execution, after some delay
// after 1 second the function is eligible for execution
// non-blocking function
setTimeout(() => { // f
    console.log( 2 );
}, 1000);

console.log( 3 );

// Event queue : A queue of function waiting to be executed
// After 1 second the event queue looks like...
// ---------------
// | (f, args)
// ---------------
// 
// Right after this, the function is executed
// f( args )