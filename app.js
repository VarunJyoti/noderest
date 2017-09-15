var express= require('express');
var app = express();
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/bookAPI')
var bodyParser = require('body-parser');
var Book = require('./models/bookModel');
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var bookRouter = require('./routes/bookroutes')(Book);

app.use('/api/books', bookRouter);

app.listen(PORT, function(){
	console.log("Running"+PORT);
})