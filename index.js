const express = require('express');
const { gpt } = require('gpti');

const app = express();
const port = 3000;

app.get('/gpt', (req, res) => {
    const prompt = req.query.prompt;
    if (!prompt) {
        return res.status(400).send({ error: 'Prompt is required' });
    }

    const messages = [
        { role: 'user', content: prompt }
    ];

    gpt.v2({
        messages: messages,
        markdown: false,
        stream: false
    }, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ error: 'Internal Server Error' });
        } else {
            console.log(data);
            return res.status(200).send(data);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
