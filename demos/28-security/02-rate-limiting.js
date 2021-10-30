var express = require('express');
const RateLimiter = require('async-ratelimiter');
const { getClientIp } = require('request-ip');
const Redis = require('ioredis');

var app = express();

const rateLimiter = new RateLimiter({
    db: new Redis(),
    max: 10,
    duration: 60e3
});
  
app.use(async (req, res, next) => {
    try {
        const clientIp = getClientIp( req )
        const limit = await rateLimiter.get({ id: clientIp })
    
        if( !res.writableEnded && !res.headersSent ) {
            res.setHeader('X-Rate-Limit-Limit', limit.total)
            res.setHeader('X-Rate-Limit-Remaining', Math.max(0, limit.remaining - 1))
            res.setHeader('X-Rate-Limit-Reset', limit.reset)
        }
    
        if( !limit.remaining ) {
            return res.status( 429 ).json({
                status: 'error',
                message: 'No more candies for your. Save your sweettooth before you lose them all.'
            });
        } else {
            next();
        }
    } catch( err ) {
        return res.status( 500 ).json({
            status: 'error',
            message: err.message
        });
    }
});

app.use(async function candyServer( req, res ) {
    return res.json({
        status: 'success',
        message: 'Enjoy your candy 🍭'
    });
});
 
const PORT = process.env.PORT || 3000;

app.listen( PORT, err => {
    if( err ) {
        console.error( error.message );
        return;
    }

    console.log( `http://localhost:${PORT}` );
});