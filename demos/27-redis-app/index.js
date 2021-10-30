// connect to the DB at startup
require( './data/init.js' ); 

const express = require( 'express' );
const path = require( 'path' );

const indexRouter = require( './routes/' ); // by default the index file is imported
const workshopsRouter = require( './routes/workshops' );
const authRouter = require( './routes/auth' );
const loggerRouter = require( './middleware/logger' );
const errorRouter = require( './middleware/error' );
const { pageNotFound, errorHandler } = require( './middleware/error' );

const app = express();

app.set( 'view engine', 'ejs' );
app.set( 'views', path.join( process.cwd(), 'views' ) );

app.use( loggerRouter );

// req.body (JS object)
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );

app.use( express.static( path.join( process.cwd(), 'public' ) ) );
app.use( indexRouter );
app.use( '/auth', authRouter );
app.use( '/workshops', workshopsRouter );

app.use( pageNotFound );
app.use( errorHandler );

app.listen( 3000, ( err ) => {
    if( err ) {
        console.log( err.message );
        return;
    }

    console.log( 'Server started on http://localhost:3000' );
});