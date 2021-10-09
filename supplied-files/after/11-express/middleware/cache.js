const redis = require( 'redis' );

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = redis.createClient( REDIS_PORT );

function cache( redisKeyPrefix, reqParam ) {
    return function( req, res, next ) {
        const param = req.params[reqParam];

        client.get( `${redisKeyPrefix}:${param}`, ( err, data ) => {
            if( err ) {
                return next();
            }

            if( data === null ) {
                return next();
            }

            // Success! We have the data in Redis
            res.send({
                message: 'cached data',
                data: JSON.parse( data )
            });
        });
    }
}

module.exports = cache;