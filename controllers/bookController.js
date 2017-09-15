var bookController = function(Book){
	var post = function(req, res) {
		if(!req.body.title){
			res.status(400);
			res.send("Title is required");
		}else{
			var book = new Book(req.body);
	        book.save();
	        console.log(book);
	        res.status(201);
	        res.send(book);
		}
        
    }

    var get = function(req, res) {
            var query = {};
            Book.find(query, function(err, books) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(books);
                }
            });

        }

        return {
        	post: post,
        	get: get
        }
}

module.exports = bookController;