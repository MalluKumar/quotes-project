const express = require('express');
const app = express();
const records = require('./records');

// Middleware method to parse incoming JSON from the client and make it available to Express server via req.body
app.use(express.json());

// middleware to avoid using try/cath in every code block.
function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next);
        } catch (err) {
            next(err);
        }
    }
}

app.get('/', asyncHandler((req, res) => {
    if (res.statusCode === 200) {
        res.json({ greeting: "Hello Welcome!!" });
    } else {
        res.status(500).json({ message: "Something's wrong, try after sometime." });
    }
}));

// Send a GET request to /quotes to read or view all the quotes.
app.get('/quotes', asyncHandler(async (req, res) => {
    const quotes = await records.getQuotes();
    if (quotes) {
        res.json(quotes);
    } else {
        res.json({ message: "No quote records to display." });
    }
}));

// Send a GET request to /quotes/:id to read or view a quote.
app.get('/quotes/:id', asyncHandler(async (req, res) => {
    const recordData = await records.getQuote(req.params.id);
    if (recordData) {
        res.json(recordData);
    } else {
        res.status(404).json({ message: "Quote record not found" });
    }
}));

// Send a POST request to /quotes to create or add a new quote.
app.post('/quotes', asyncHandler(async (req, res) => {
    if (req.body.quote && req.body.author) {
        const newQuote = await records.createQuote({
            quote: req.body.quote,
            author: req.body.author
        });
        res.status(201).json(newQuote);
    } else {
        res.status(400).json({ message: "quote and author information required." });
    }
}));

// Send a PUT request to /quotes/:id route to update quote.
app.put('/quotes/:id', asyncHandler(async (req, res) => {
    const quote = await records.getQuote(req.params.id);
    if (quote) {
        quote.quote = req.body.quote;
        quote.author = req.body.author;
        await records.updateQuote(quote);
        res.status(204).end();
    } else {
        res.status(404).json({ message: "Please enter a valid quote id." });
    }
}));

/* Send a delete request to /quotes/:id route to delete quote.
app.delete('/quotes/:id', async (req, res, next) => {

    try {
        const quote = await records.getQuote(req.params.id);
        if (quote) {
            await records.deleteQuote(quote);
            res.status(204).end();
        } else {
            res.status(404).json({ message: "Quote not found." });
        }
    } catch (err) {
        next(err);
    }

});
*/

// Send a delete request to /quotes/:id route to delete quote (another way using middleware to handle try/catch).
app.delete('/quotes/:id', asyncHandler(async (req, res) => {
    const quote = await records.getQuote(req.params.id);
    if (quote) {
        await records.deleteQuote(quote);
        res.status(204).end();
    } else {
        res.status(404).json({ message: "Quote not found." });
    }
}));

// called to handle routes that are not defined.
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
});

app.listen(3000, () => console.log('API listening on localhost:3000'));