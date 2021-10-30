var express = require('express');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');

// run Malicious site for demo purpose!
require('./04-malicious-website');

// setup route middlewares
var csrfProtection = csrf({ cookie: true });
var parseForm = express.urlencoded({ extended: false });

// create express app
var app = express();

// we need this because "cookie" is true in csrfProtection
app.use(cookieParser());

app.get('/', csrfProtection, (req, res) => {
    // pass the csrfToken to the view
    res.send(
        `
            <h1>Bank website 🏦</h1>
            <form action="/process" method="POST">
                <div>
                    <label for="beneficiary">Beneficiary account number</label>
                    <input id="beneficiary" name="beneficiary" type="text" />
                </div>
                <div>
                    <label for="amount">Enter amount</label>
                    <input id="amount" name="amount" type="text" />
                </div>
                <input type="submit" value="Submit" />
                <input type="hidden" name="_csrf" value="${req.csrfToken()}" />
            </form>
        `
    );
});

app.post('/process', parseForm, csrfProtection, (req, res) => {
    res.send(
        `
            <p>
                <strong>
                    Transferred Rs. ${req.body.amount} to beneficiary account ${
            req.body.beneficiary
        }
                </strong>
            </p>
            <p>
                Request body: ${JSON.stringify(
                    req.body,
                    null,
                    4
                )}, CSRF Cookie = ${req.cookies._csrf}
            </p>
        `
    );
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
    if (err) {
        console.error(error.message);
        return;
    }

    console.log(`Bank site: http://localhost:${PORT}`);
});
