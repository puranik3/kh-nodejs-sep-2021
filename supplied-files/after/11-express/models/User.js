const mongoose = require( 'mongoose' );
const { encryptPassword, checkPassword } = require( '../utils/auth' );

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: [ String ],
        enum: [ 'general', 'admin' ],
        default: 'general'
    }
});

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Reference: https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

userSchema.path( 'email' ).validate( email => emailRegex.test( email.toLowerCase() ), 'Invalid email id format' );

userSchema.path( 'password' ).validate( password => passwordRegex.test( password ), 'Invalid password format - Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 numeric character, and one special character' );

userSchema.pre( 'save', function( done ) {
    const user = this;

    // password has not been updated
    if( !user.isModified( 'password' ) ) {
        return done();
    }

    encryptPassword( user.password, ( err, hashedPassword ) => {
        if( err ) {
            return done( err );
        }

        user.password = hashedPassword;
        done();
    });
});

// userSchema.pre( 'updateOne', function( done ) {
    
// });

userSchema.methods.checkPassword = function( password, done ) {
    checkPassword( password, this.password, done );
};

mongoose.model( 'User', userSchema );
