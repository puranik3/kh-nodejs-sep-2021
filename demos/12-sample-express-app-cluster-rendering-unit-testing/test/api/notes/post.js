process.env.NODE_ENV = 'test';

const { expect } = require( 'chai' );
const app = require( '../../../bin/www' );
const request = require( 'supertest' );

describe( 'GET /api/notes', () => {
    // afterEach(() => {
    //     moc
    // });

    it( 'Return status code = 201 on success', ( done ) => {
        const note = {
            title: 'New note 1',
            body: 'New note 1 body'
        };

        request( app )
            .post( '/api/notes' )
            .send( note )
            .then( res => {
                // console.log( res );
                expect( res.status ).to.equal( 201 );
                done();
            })
            // .catch(err => {
            //     console.error( err.message );
            // });
    });
});
