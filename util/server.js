var express = require('express');
var http = require('http');
var app = express();
var httpServer = http.createServer(app);
var fs = require('fs');
var cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
    console.log("Server is reading fakeDatabase.txt")
    fs.readFile('dummyData.json', 'utf-8', function doneReading(err, fileContents) {
        var db = fileContents.toString();
        res.send(db);
    });
});


httpServer.listen(4000, () => {
    console.log("Listening on Port 4000")
});
