const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/<FOLDER_NAME>'));

app.get('/*', (req,res,next) => {
    res.sendFile(path.join(__dirname + '/dist/dictionary/index.html'));
});


app.listen(process.env.PORT || 8000);