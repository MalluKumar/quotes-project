const express = require('express');
const app = express();
const records = require('./records');

app.use(express.json());

app.get('/', (req, res) => {

    try {
        res.json({ greeting: "Hello Welcome!!" });
    } catch (err) {
        res.json({ message: err.message });
    }

});

// Send a GET request to /quotes to read or view all the quotes.
app.get('/quotes', async (req, res) => {

    try {
        const quotes = await records.getQuotes();
        res.json(quotes);
    } catch (err) {
        res.json({ message: err.message });
    }

});

// Send a GET request to /quotes/:id to read or view a quote.
app.get('/quotes/:id', async (req, res) => {

    try {
        const recordData = await records.getQuote(req.params.id);
        res.json(recordData);
    } catch (err) {
        res.json({ message: err.message });
    }

});

// Send a POST request to /quotes to create or add a new quote.
app.post('/quotes', async (req, res) => {

    try {
        const newQuote = await records.createQuote({
            quote: req.body.quote,
            author: req.body.author
        });
        res.json(newQuote);
    } catch (err) {
        res.json({ message: err.message });
    }

});

app.listen(3000, () => console.log('API listening on localhost:3000'));