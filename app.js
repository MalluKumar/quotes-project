const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({ greeting: "Hello Welcome!!" });
});

app.listen(3000, () => console.log('API listening on localhost:3000'));

const data = {
    records: [
        {
            "id": 8721,
            "quote": "We must accept finite disappointment, but we must never lose infinite hope.",
            "author": "Martin Luther King"
        },
        {
            "id": 5779,
            "quote": "Use what you’ve been through as fuel, believe in yourself and be unstoppable!",
            "author": "Yvonne Pierre"
        },
        {
            "id": 3406,
            "quote": "To succeed, you have to do something and be very bad at it for a while. You have to look bad before you can look really good.",
            "author": "Barbara DeAngelis"
        }
    ]
}
