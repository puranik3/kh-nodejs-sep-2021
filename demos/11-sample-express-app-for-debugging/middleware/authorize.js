
const authorize = ( role ) => {
    return ( req, res, next ) => {
        const { claims } = res.locals;

        // user with privileges for this endpoint
        if( claims.role === role ) {
            next();
        } else { // user without privileges for this endpoint
            next( new Error( 'You do not have rights to view this' ) );
            return;
        }
    };
};

module.exports = authorize;