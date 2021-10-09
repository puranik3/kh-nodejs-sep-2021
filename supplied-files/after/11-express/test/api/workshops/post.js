process.env.NODE_ENV = 'test';

const { connect, disconnect } = require( '../../../data/init' );
const request = require( 'supertest' );
const expect = require( 'chai' ).expect;
const app = require( '../../../index' );


describe( 'POST /workshops', () => {
    // beforeEach( connect );
    // afterEach( disconnect );

    it( 'new workshop created', () => {
        console.log( process.env.NODE_ENV );
        
        const workshop = {
            "location": {
                address: "Andheri",
                city: "Mumbai",
                state: "Maharashtra"
            },
            modes: [
                "online",
                "classroom"
            ],
            "name": "Express workshop v26",
            "description": "Some updated description for the Express workshop",
            "startDate": "2021-10-14",
            "endDate": "2021-10-29",
            "startTime": "9:00 AM",
            "endTime": "1:00 PM"
        };
        
        return request( app ).post( '/workshops' )
            .send( workshop )
            .then( res => {
                console.log( res.body )
            });
    });

    // it( 'test runs', () => {
    //     expect( true ).to.equal( true );
    // });
});