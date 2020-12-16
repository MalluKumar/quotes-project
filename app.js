const express = require('express');
const app = express();
const records = require('./records');

// Middleware method to parse incoming JSON from the client and make it available to Express server via req.body
app.use(express.json());

app.get('/', (req, res) => {

    try {
        if (res.statusCode === 200) {
            res.json({ greeting: "Hello Welcome!!" });
        } else {
            res.status(500).json({ message: "Something's wrong, try after sometime." });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

// Send a GET request to /quotes to read or view all the quotes.
app.get('/quotes', async (req, res) => {

    try {
        const quotes = await records.getQuotes();
        if (quotes) {
            res.json(quotes);
        } else {
            res.json({ message: "No quote records to display." });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

// Send a GET request to /quotes/:id to read or view a quote.
app.get('/quotes/:id', async (req, res) => {

    try {
        const recordData = await records.getQuote(req.params.id);
        if (recordData) {
            res.json(recordData);
        } else {
            res.status(404).json({ message: "Quote record not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

// Send a POST request to /quotes to create or add a new quote.
app.post('/quotes', async (req, res) => {

    try {
        if (req.body.quote && req.body.author) {
            const newQuote = await records.createQuote({
                quote: req.body.quote,
                author: req.body.author
            });
            res.status(201).json(newQuote);
        } else {
            res.status(400).json({ message: "quote and author information required." });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

// Send a PUT request to /quotes/:id route to update quote.
app.put('/quotes/:id', async (req, res) => {

    try {
        const quote = await records.getQuote(req.params.id);
        if (quote) {
            quote.quote = req.body.quote;
            quote.author = req.body.author;
            await records.updateQuote(quote);
            res.status(204).end();
        } else {
            res.status(404).json({ message: "Please enter a valid quote id." });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

// Send a delete request to /quotes/:id route to delete quote.
app.delete('/quotes/:id', async (req, res) => {

    try {
        const quote = await records.getQuote(req.params.id);
        if (quote) {
            await records.deleteQuote(quote);
            res.status(204).end();
        } else {
            res.status(404).json({ message: "Quote not found." });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

app.listen(3000, () => console.log('API listening on localhost:3000'));