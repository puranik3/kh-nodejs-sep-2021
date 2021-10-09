const mongoose = require( 'mongoose' );
const Note = mongoose.model( 'Note' );

const getNotes = ( req, res ) => {
    Note
        .find()
        .then(notes => {
            res.status( 200 ).json({
                status: 'success',
                data: notes
            });
        })
        .catch(err => {
            res.send( 400 ).json({
                status: 'error',
                message: 'Bad request'
            });
        })
};

const postNotes = ( req, res ) => {
    const note = req.body;

    Note
        .create( note )
        .then( insertedNote => {
            res.status( 201 ).json({
                status: 'success',
                data: insertedNote
            })
        })
        .catch(err => {
            if( err.name = 'ValidationError' ) {
                res.send( 400 ).json({
                    status: 'error',
                    message: 'Bad request'
                });
            } else {
                res.send( 500 ).json({
                    status: 'error',
                    message: 'Internal server error'
                });
            }
        });

};

module.exports = {
    getNotes,
    postNotes
};