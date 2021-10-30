var express = require('express');
var helmet = require('helmet');
 
var app = express();
 
app.use(helmet());

app.get( '/', ( req, res ) => {
    res.send(
        `Helmet adds / removes some HTTP headers in order to improve security. Check <a href="https://www.npmjs.com/package/helmet">Helmet npm module</a> and the <a href="http://expressjs.com/en/advanced/best-practice-security.html#use-helmet">Express JS site</a> for more details.`
    );
});

const PORT = process.env.PORT || 3000;

app.listen( PORT, err => {
    if( err ) {
        console.error( error.message );
        return;
    }

    console.log( `http://localhost:${PORT}` );
});