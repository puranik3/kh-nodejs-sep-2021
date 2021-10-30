var express = require('express');
const createDOMPurify = require('dompurify');

const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

var app = express();

const comments = [];

// we need this because "cookie" is true in csrfProtection
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.cookie('access_token', 'somesecretaccesstoken');
    res.send(
        `
            <!doctype html>
            <html>
                <section>
                    <h1>Roadtripping in Rajasthan</h1>
                    <p lang="en">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas voluptatibus labore excepturi dignissimos facilis sed nemo temporibus fuga! Corporis earum consequatur in minima! Iure inventore quam totam animi pariatur nobis.
                    </p>
                </section>
                <h2>Leave a comment</h2>
                <form action="/comment" method="POST">
                    <div>
                        <textarea id="comment" name="comment"></textarea>
                    </div>
                    <small>Try giving this as input - <strong>&lt;script&gt;console.log( document.cookie );&lt;/script&gt;</strong> - Find <a href="https://github.com/cure53/DOMPurify#some-purification-samples-please">more samples</a> here.</small>
                    <div>
                        <input type="submit" value="Comment" />
                    </div>
                </form>
                <h2>Comments</h2>
                <ul>
                    ${comments.map((comment) => `<li>${comment}</li>`).join('')}
                </ul>
            </html>
        `
    );
});

app.post('/comment', (req, res) => {
    const sanitizedComment = DOMPurify.sanitize(req.body.comment);
    console.log(DOMPurify.removed);

    comments.push(sanitizedComment);

    res.send(
        `Your comments have been captured. Nice try, if you tried sending malicious code.`
    );
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
    if (err) {
        console.error(error.message);
        return;
    }

    console.log(`http://localhost:${PORT}`);
});
