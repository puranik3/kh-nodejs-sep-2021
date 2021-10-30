const jwt = require( 'jsonwebtoken' );
const bcrypt = require( 'bcrypt' );

const SALT_FACTOR = 10;

const authenticate = ( req, res, next ) => {
    // extract the token
    const token = req.header( 'Authorization' );

    // if token is not present send error
    if( !token ) {
        const err = new Error( 'Token is not sent' );
        err.status = 403;
        return next( err );
    }

    // verify the token - send error on invalid token / send the control to next middleware
    jwt.verify(token, 'shhh...', function(err, claims) {
        if( err ) {
            return res.status( 403 ).json({
                message: 'Go away intruder'
            });
        }

        res.locals.claims = claims;
        
        next();
    });
};

const authorize = ( role ) => {
    return function( req, res, next ) {
        const claims = res.locals.claims;

        if( !claims.roles.includes( role ) ) {
            const error = new Error( 'You are not authorized' );
            error.status = 403;
            return next( error );
        }

        next();
    }
};

function setClaims( req, res, next ) {
    const token = req.header( 'Authorization' );

    if( !token ) {
        res.locals.claims = null;
        return next();
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, claims) {
        if( err ) {
            const error = new Error( 'Something went wrong processing claims' );
            return next( error );
        }

        res.locals.claims = claims;
        next();
    });
}

function isAdmin( req, res, next ) {
    if( !res.locals.claims.roles.includes( 'admin' ) ) {
        const error = new Error( 'You do not have sufficient privileges' );   
        error.status = 403;

        return next( error );
    }

    next();
}

function encryptPassword( password, done ) {
    bcrypt.genSalt( SALT_FACTOR, ( err, salt ) => {
        if( err ) {
            return done( err );
        }

        bcrypt.hash( password, salt, ( err, hashedPassword ) => {
            if( err ) {
                return done( err );
            }

            done( null, hashedPassword );
        });
    });
}

function checkPassword( password, encryptedPassword, done ) {
    bcrypt.compare( password, encryptedPassword, ( err, isMatch ) => {
        done( err, isMatch );
    });
}

module.exports = {
    authenticate,
    authorize,
    setClaims,
    isAdmin,
    encryptPassword,
    checkPassword
};