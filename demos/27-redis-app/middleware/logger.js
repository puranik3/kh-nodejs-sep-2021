const express = require( 'express' );

const router = express.Router();

// logger middleware
router.use( ( req, res, next ) => {
    res.locals.receivedDate = new Date();
    next();
    console.log( 'response is being sent 1' );
    console.log( 'process.pid = ', process.pid );
});

router.use( function dateLogger( req, res, next ) {
    console.log( 'New request received at time ', res.locals.receivedDate.toTimeString() );
    
    // res.write(); // ok even if we call next
    next();

    console.log( 'response is being sent 2' );
    console.log( 'New request received at time ', (new Date()).toTimeString() );

    // if we send an end of response message, then no further middleware is called
    // res.end( res.locals.receivedDate.toString() );
});

module.exports = router;