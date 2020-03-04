const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/ping', (req, res) => {
    console.log('Req body received @ping', req);
    return res.send({ express: 'Hello from express'});
});

app.get('/api/hey', (req, res) => res.send('ho!'))

app.get('/', (req, res) => {
    res.send('Hello world ')
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// app.listen(process.env.PORT || 8080);
app.listen(8080, () => console.log('Server running on port 8080'));

