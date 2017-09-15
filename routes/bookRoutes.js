var express = require('express');
var routes = function(Book) {
	var bookRouter = express.Router();
	var bookController = require('../controllers/bookController')(Book);
    bookRouter.route('/')
        .post(bookController.post)
        .get(bookController.get);
    bookRouter.use("/:bookId", function(req, res, next){
    	Book.findById(req.params.bookId, function(err, book) {
            if (err) {
                console.log(err);
            } else if(book) {
                req.book = book;
                next();
            }else{
            	res.status(400).send("Not found");
            }
        });
    });
    bookRouter.route("/:bookId")
        .get(function(req, res) {
            res.json(req.book);
        })
        .put(function(req, res){
        	
        		req.book.title = req.body.title;
        		req.book.author = req.body.author;
        		req.book.genre = req.body.genre;
        		req.book.save();
        		res.send(req.book);

        })
        .delete(function(req, res){
        	req.book.remove(function(err){
        		res.status(204);
        	});
        })
        return bookRouter;
}

module.exports = routes;