const express = require( 'express' );

const router = express.Router();

// logger middleware
router.use( ( req, res, next ) => {
    res.locals.receivedDate = new Date();
    console.log( 'New request was received' );
    next();
});

router.use( function dateLogger( req, res, next ) {
    console.log( 'New request received at time ', res.locals.receivedDate.toTimeString() );
    
    next();
});

module.exports = router;