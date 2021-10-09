process.env.NODE_ENV = 'test';

const { expect } = require( 'chai' );
const app = require( '../../../bin/www' );
const request = require( 'supertest' );

describe( 'GET /api/notes', () => {
    // afterEach(() => {
    //     moc
    // });

    it( 'Return status code = 200 on success', ( done ) => {
        request( app )
            .get( '/api/notes' )
            .then( res => {
                // console.log( res );
                expect( res.status ).to.equal( 200 );
                done();
            });
    });

    it( 'Returns all notes on success', ( done ) => {
        request( app )
            .get( '/api/notes' )
            .then( res => {
                // console.log( res );
                expect( res.body.status ).to.equal( 'success' );
                expect( res.body.data ).to.be.an( 'array' );
                expect( res.body.data.length ).to.equal( 0 );
                done();
            })
            .catch(err => {
                console.error( err.message );
                done();
            });
    });
});
