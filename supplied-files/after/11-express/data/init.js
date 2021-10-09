const mongoose = require( 'mongoose' );

require( '../models/Workshop' );
require( '../models/User' );

mongoose.set( 'returnOriginal', false );
mongoose.set( 'useFindAndModify', false );

// const connectionStr = 'mongodb://user:password@...'
const connectionStr = 'mongodb://localhost:27017/workshopsDB';

const connect = () => {
    const connectHelper = () => {
        return mongoose.connect( connectionStr, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    };

    if( process.env.NODE_ENV === 'test' ) {
        const Mockgoose = require( 'mockgoose' ).Mockgoose;
        const mockgoose = new Mockgoose( mongoose );

        return mockgoose.prepareStorage()
            .then( connectHelper );
        
        // const Mockgoose = require( 'mockgoose' ).Mockgoose;
        // const mockgoose = new Mockgoose( mongoose );

        // return new Promise( ( resolve, reject ) => {
        //     mockgoose.prepareStorage().then(function() {
        //         mongoose.connect('mongodb://example.com/TestingDB', function(err) {
        //             if( err ) {
        //                 return reject(err);
        //             }

        //             resolve();
        //         });
        //     });
        // });
    } else {
        return connectHelper();
    }
}

const disconnect = () => {
    return mongoose.disconnect();
};

module.exports = {
    connect,
    disconnect
};