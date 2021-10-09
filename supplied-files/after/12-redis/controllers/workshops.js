const mongoose = require( 'mongoose' );
const Workshop = mongoose.model( 'Workshop' );
const redis = require( 'redis' );

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = redis.createClient( REDIS_PORT );

// NOTE: Ideally text searches are implemented using a MongoDB text index + text query (not using regular expression match)
// GET /workshops?page=2&pageSize=5&search=React
// https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261
// Promise.all(), Promise.race()
const getWorkshops = async ( req, res, next ) => {
    let { page, pageSize, search } = req.query;
    page = +page;
    pageSize = +pageSize;

    let filterClause = {};
    if( search ) { // { name: /Angular/i }
        filterClause.name = new RegExp( search, 'i' );
    }

    // "Promise" is a class, and exec() gives a Promise object (Promise is generated immediately and it represents a future value)
    try {
        // we await on a Promise (nothing else can be used)
        const results = await Workshop
            .find( filterClause )
            .select( { name: true, modes: true } )
            .sort( { name: 'asc' } )
            .skip( ( page - 1 ) * pageSize )
            .limit( pageSize )
            .exec();

        // Example of how to use await to wait on further async calls...
        // the following 2 async calls with await are rather unnecessary and are added for demo purpose
        const results2 = await Promise.resolve( results );
        // const results2 = await Workshops.find( results ).exec();
        const results3 = await Promise.resolve( results2 );

        res.json( results3 );
    } catch( err ) {
        err.status = 500;
        next( err );
        return;
    }
};

const getWorkshopById = ( req, res, next ) => {
    const id = req.params.id;

    // not a proper object id
    if( id.length !== 24 ) {
        const err = new Error( 'Workshop with matching id not found' );
        err.status = 404;
        next( err );
        return;
    }
    
    // similarly use query params
    // const id = req.query.x;
    // const id = req.query.y;

    Workshop
        .findById( id, ( err, workshop ) => {
            if( err ) {
                err.status = 500;
                next( err );
                return;
            }

            // if no matching id (hence no worshop is retrieved)
            if( !workshop ) {
                const err = new Error( 'Workshop with matching id not found' );
                err.status = 404;
                next( err );
                return;
            }

            // store workshop in the cache
            client.setex( `workshops:${id}`, 5 * 60, JSON.stringify( workshop ) );

            // send response
            res.json({
                message: 'non-cached data',
                data: workshop
            });
        })
};

const postWorkshop = ( req, res, next ) => {
    const workshop = req.body;

    Workshop
        .create( workshop, ( err, updatedWorkshop ) => {
            if( err ) {
                if( err instanceof mongoose.Error.ValidationError ) {
                    err.status = 400; // Bad request
                } else {
                    err.status = 500; // Internal server error ( eg. DB connection issue)
                }

                next( err );
                return;
            }

            // 201 is status code for "new resource is created"
            res.status( 201 ).json( updatedWorkshop );
        })
};

const patchWorkshop = ( req, res, next ) => {
    const workshop = req.body;
    const { id } = req.params;

    Workshop
        .findByIdAndUpdate( id, workshop, { /*new: true*/ runValidators: true }, ( err, updatedWorkshop ) => {
            if( err ) {
                if( err instanceof mongoose.Error.ValidationError ) {
                    err.status = 400; // Bad request
                } else {
                    err.status = 500; // Internal server error ( eg. DB connection issue)
                }

                next( err );
                return;
            }

            res.json( updatedWorkshop );
        })
};

// Used to add a new mode for a workshop
// req body should have an array of modes - example: [ 'hybrid' ]
const postWorkshopMode = ( req, res, next ) => {
    const body = req.body;
    let workshops;

    if( typeof body === 'string' ) {
        workshops = [ body ];
    } else if( body instanceof Array ) {
        workshops = body;
    } // else -> send an error (@todo)

    const { id } = req.params;

    const updateClause = {
        $addToSet: {
            modes: {
                $each: workshops
            }
        }
    };

    Workshop
        .findByIdAndUpdate( id, updateClause, { /*new: true*/ runValidators: true }, ( err, updatedWorkshop ) => {
            if( err ) {
                if( err instanceof mongoose.Error.ValidationError ) {
                    err.status = 400; // Bad request
                } else {
                    err.status = 500; // Internal server error ( eg. DB connection issue)
                }

                next( err );
                return;
            }

            res.json( updatedWorkshop );
        })
};

const deleteWorkshop = ( req, res, next ) => {
    const { id } = req.params;

    Workshop
        .findByIdAndRemove( id, ( err ) => {
            if( err ) {
                err.status = 500; // Internal server error ( eg. DB connection issue)
                next( err );
                return;
            }

            // Use 204 for empty response
            res.status( 204 ).send();
        })
};

module.exports = {
    getWorkshops,
    getWorkshopById,
    postWorkshop,
    patchWorkshop,
    postWorkshopMode,
    deleteWorkshop
};