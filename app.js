const express = require('express');
const app = express();
const records = require('./records');

app.get('/', (req, res) => {
    res.json({ greeting: "Hello Welcome!!" });
});

// Send a GET request to /quotes to read or view all the quotes.
app.get('/quotes', async (req, res) => {
    const quotes = await records.getQuotes();
    res.json(quotes);
});

// Send a GET request to /quotes/:id to read or view a quote.
app.get('/quotes/:id', async (req, res) => {
    const recordData = await records.getQuote(req.params.id);
    res.json(recordData);
});

app.listen(3000, () => console.log('API listening on localhost:3000'));