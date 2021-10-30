var express = require('express');
var cookieParser = require('cookie-parser');
require( 'dotenv' ).config();
 
var app = express();
 
app.use(cookieParser( process.env.COOKIE_SECRET_KEY));

app.get('/', function (req, res) {
    res
        .cookie( 'access_token_unsigned', 'some_unsigned_token', {
            maxAge: 60 * 60 * 1000, // expires 1 hour from now
            
            // restrict cookie to requests from this domain and path
            domain: `localhost:${PORT}`,
            path: '/admin',
            
            httpOnly: true, // cannot be set using JS
            signed: false,
            // secure: true // passed only in an HTTPS request
        })
        .cookie( 'access_token_signed', 'some_signed_token', {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            signed: true
        })

    res.send(
        `
            <nav>
                <a href="/" style="margin-right: 30px;">/</a>
                <a href="/admin" style="margin-right: 30px;">/admin</a>
                <a href="/admin/runscript">/admin/runscript</a>
            </nav>
            <h1>Securing cookies</h1>
            <p>I sent some 🍪 🍪 🍪 for you Mr.admin - visit <a href="/admin">/admin</a> and check the Network/Application tab as well to find them - you are well-behaved and have no JavaScript that tries to sneak out some of the 🍪 🍪 🍪</p>
            <p>That crook <a href="/admin/runscript">/admin/runscript</a> shall not be able to swindle the 🍪 🍪 🍪 using his malicious JS code</p>
            <hr />
            <h2>Cookies</h2>
            <div>Cookie that have NOT been signed: ${JSON.stringify( req.cookies, null, 4 )}</div>
            <div>Cookies that have been signed: ${JSON.stringify(req.signedCookies, null, 4)}</div>
        `
    );
});

app.get('/admin', function (req, res) {
    res.send(
        `
            <nav>
                <a href="/" style="margin-right: 30px;">/</a>
                <a href="/admin" style="margin-right: 30px;">/admin</a>
                <a href="/admin/runscript">/admin/runscript</a>
            </nav>
            <h1>Securing cookies</h1>
            <p>Received 🍪 🍪 🍪 from you Mr.admin. Thanks for the return gift. Loved it.</p>
            <hr />
            <h2>Cookies</h2>
            <div>Cookie that have NOT been signed: ${JSON.stringify( req.cookies, null, 4 )}</div>
            <div>Cookies that have been signed: ${JSON.stringify(req.signedCookies, null, 4)}</div>
        `
    );
});

app.get('/admin/runscript', function (req, res) {
    res.send(
        `
            <nav>
                <a href="/" style="margin-right: 30px;">/</a>
                <a href="/admin" style="margin-right: 30px;">/admin</a>
                <a href="/admin/runscript">/admin/runscript</a>
            </nav>
            <h1>Securing cookies</h1>
            <p>Do not even think of writing some sneaky script to steal the 🍪 🍪 🍪</p>
            <p>I knew it - you wouldn't listen. You tried logging the cookies in the console, didn't you?! Did you find the cookies? No right? Better luck next time.</p>
            <hr />
            <h2>Cookies</h2>
            <div>Cookie that have NOT been signed: ${JSON.stringify( req.cookies, null, 4 )}</div>
            <div>Cookies that have been signed: ${JSON.stringify(req.signedCookies, null, 4)}</div>
            <script>
                console.log( 'document.cookie = ', document.cookie );
            </script>
        `
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