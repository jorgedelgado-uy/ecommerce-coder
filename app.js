const express = require('express');
const app = express();
const path = require('path');

//Global variables
app.set('port', process.env.port || 8080);

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), error =>{
    if (error)
        throw new Error(`${error.message}`);
    else
        console.log(`Listening through port ${app.get('port')}`);
})