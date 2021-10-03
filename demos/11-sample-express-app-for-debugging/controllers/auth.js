const users = require( "../data/users.json" );
const jwt = require( 'jsonwebtoken' );

const login = ( req, res, next ) => {
    const credentials = req.body;
    
    const match = users.find( user => user.email === credentials.email && user.password === credentials.password );

    if( !match ) {
        next( new Error( 'Go away intruder' ) );
        return;
    }

    const claims = {
        email: match.email,
        role: match.role
    };

    // NOTE: JWT_SECRET is an environment variable
    jwt.sign( claims, process.env.JWT_SECRET, ( error, token ) => {
        if( error ) {
            next( new Error( 'Error in generating token' ) );
            return;
        }

        res.json({
            message: 'success',
            token,
            email: match.email
        });
    });
};

module.exports = {
    login
};