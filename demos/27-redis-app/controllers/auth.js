const jwt = require( 'jsonwebtoken' );
const mongoose = require( 'mongoose' );

const User = mongoose.model( 'User' );

/**
 * Sample request body
 * req.body = { "name": "John Doe", "email": "john.doe@example.com", "password": "johndoe" }
 */
const register = ( req, res, next ) => {
    const credentials = req.body;

    if( !credentials.email ) {
        const error = new Error( 'email id not supplied' );
        error.status = 400;
        return next( error );
    }

    User
        .findOne( { email: credentials.email } )
        .exec(( error, result ) => {
            if( error ) {
                const error = new Error( 'unknown db error' );
                error.status = 500;
                return next( error );
            }

            if( result ) {
                const error = new Error( 'user with this email id already exists' );
                error.status = 409;
                return next( error );
            }

            User
                .create( credentials, ( error, createdUser ) => {
                    if( error ) {
                        error.status = 500;
                        return next(error);
                    }
        
                    res.status( 204 ).send();
                });
        });
};

/**
 * Sample request body
 * req.body = { "email": "john.doe@example.com", "password": "johndoe" }
 */
const login = ( req, res, next ) => {
    const credentials = req.body;
    
    User
        .findOne( { email: credentials.email } )
        .exec(( error, result ) => {
            if( error || !result || typeof result !== 'object' || Object.keys( result ).length === 0 ) {
                if( error ) {
                    error.status = 403;
                    return next( error );
                } else {
                    const error = new Error( 'unknown db error' );
                    error.status = 500;
                    return next( error );
                }
            }

            // check match of password
            result.checkPassword( credentials.password, ( err, isMatch ) => {
                if( err || !isMatch ) {
                    const error = err || new Error( 'credentials do not match' );
                    error.status = 401;
                    return next( error );
                }

                const claims = {
                    userId: result._id,
                    name: result.name,
                    email: result.email,
                    roles: result.roles
                };
        
                jwt.sign(claims, 'shhh...', { expiresIn: '24h' }, ( error, token ) => {
                    if( error ) {
                        error.status = 401;
                        return next( error );
                    }

                    res.status(200).json({
                        message: 'Signed in sucessfully',
                        token: token,
                        name: result.name,
                        email: result.email,
                        roles: result.roles
                    });
                });
            })
        });
};

module.exports = {
    register,
    login
};