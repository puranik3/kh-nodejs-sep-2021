/**
 * then() and catch() each return a new Promise object.
 * Multiple callbacks can be set for resolve and reject state - they are invoked in the order they are set.
 * 
 * Instructions:
 * Follow the instructions given in-place.
 */

function sumAsync( a, b ) {
    return new Promise(( resolve, reject ) => {
        if( typeof a !== 'number' || typeof b !== 'number' ) {
            return reject( new TypeError( 'not all arguments are numbers' ) );
        }

        setTimeout( () => resolve( a + b ), 0 );
    });
}

/**
 * 1. Call sumAsync() with erroneous input and store the promise returned, in say promise1
 */

/**
 * 2. Set these as resolve callbacks using 2 separate then() calls - note that the first function below returns a number, the second another promise. Store the promises returned by the then() calls, in say, promise2 and promise3.
 * sum => { console.log( '[1]', sum ); return 1; } 
 * sum => { console.log( '[2]', sum ); return sumAsync( 3, 4 ); }
 */

/**
 * promise2/promise3 are different from promise1
 * 
 * Case 1: If a then handler of promise does not return a promise
 * In the first handler setup that returns promise2, promise2 gets fulfilled when promise1 is settled - the handler of promise2 is passed the value returned by the previous then()
 * 
 * Case 2: If a then handler of promise does returns a promise
 * This happens in the second handler setup - the promise returned by then() assumes the state as per the promise returned within the then() handler
 * This feature helps overcome the callback hell as nested asynchronous operations are now handled by returning promises in the handlers in the chain. The then() method chaining thus serializes the asynchronous function calls.
 */

/**
 * 3. Understand what the following code snippet does. 
 */
promise2.then( console.log );
promise3.then( console.log );

promise1.catch( console.error );
promise2.catch( console.error );
promise3.catch( console.error );

console.log( 'promise1 === promise2 : ', promise1 === promise2 );
console.log( 'promise2 === promise3 : ', promise2 === promise3 );