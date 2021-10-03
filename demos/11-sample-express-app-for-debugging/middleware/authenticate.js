const jwt = require( 'jsonwebtoken' );

const authenticate = ( req, res, next ) => {
    const token = req.headers.authorization.split( ' ' )[1];

    jwt.verify( token, process.env.JWT_SECRET, ( error, claims ) => {
        if( error ) {
            next( new Error( 'Unauthorized' ) );
            return;
        }

        res.locals.claims = claims;

        next();
    });
}

module.exports = authenticate;