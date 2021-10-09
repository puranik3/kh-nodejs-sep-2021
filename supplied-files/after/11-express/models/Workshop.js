const mongoose = require( 'mongoose' );

const workshopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 1000
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default: Date.now
    },
    startTime: String,
    endTime: String,
    location: {
        address: String,
        city: {
            type: String,
            enum: [ 'Bangalore', 'Mumbai' ]
        },
        state: {
            type: String,
            enum: [ 'Karnataka', 'Maharashtra' ]
        }
    },
    modes: [ String ],
    imageUrl: String
});

// a Workshop model is created (a class to interact with the collection)
// this model gets registered with Mongoose
mongoose.model( 'Workshop', workshopSchema );

// class Workshop {
//     static findById( id, cb ) {

//     }

//     static create( model, cb ) {

//     }
// }