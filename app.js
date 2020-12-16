const express = require('express');
const app = express();
const routes = require('./routes');

// Middleware method to parse incoming JSON from the client and make it available to Express server via req.body
app.use(express.json());

// requests starting with /api will be re-directed to routes.
app.use('/api', routes);

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