var loki = require('lokijs')
var express = require('express')

var app = express()
var db = new loki('loki.json')

var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
var alisto = db.addCollection('alisto2')

app.use('/', express.static('public'))

app.get('/alisto', (req, res) => {
    var results = alisto.find({'name': 'John Smith'});
    res.send(results);
});

app.post('/alisto', (req, res) => {
    alisto.chain().remove()
    var body = [].concat(req.body);
    body.forEach((i)=> {
        alisto.insert(i)
    })

    console.log('POSTED')

    res.status(201).send('ok')
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})