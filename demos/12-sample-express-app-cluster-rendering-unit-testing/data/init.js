// create Models
require( '../models/Note' );

const mockgoose = require( 'mockgoose' );
const mongoose = require( 'mongoose' );

const connectionStr = 'mongodb://localhost:27017/notesDB';

const connect = () => {
    const connectHelper = () => {
        return mongoose.connect( connectionStr, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    };

    if( process.env.NODE_ENV === 'test' ) {
        const { Mockgoose } = require( 'mockgoose' );
        const mockgoose = new Mockgoose( mongoose );

        return mockgoose.prepareStorage()
            .then( connectHelper );
    } else {
        return connectHelper();
    }
};

const disconnect = () => {
    return mongoose.disconnect();
};

module.exports = {
    connect,
    disconnect
};