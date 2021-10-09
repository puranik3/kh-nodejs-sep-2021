const mongoose = require( 'mongoose' );

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    body: {
        type: String,
        required: true
    }
});

mongoose.model( 'Note', noteSchema );