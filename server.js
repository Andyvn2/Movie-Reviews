var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var mongoose = require('mongoose');
var session = require('session');



app.use(bodyParser.urlencoded({ extended: true}));


app.use(bodyParser.json());


app.use(express.static( __dirname + '/dojocoding/dist' ));
app.use(express.static(path.join(__dirname, './views')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/basic_mongoose');

mongoose.Promise = global.Promise;

var RestSchema = new mongoose.Schema({
	name: {type: String, required: [true, "Restaraunt name is required!!!"], minlength: [3, "Name too short.Name must be longer than 3 characters!"], unique: true},
	cuisine: {type: String, required: [true, "Cuisine is required!!!"], minlength: [3, "Cuisine too short! Atleast 3 Characters"]},
	created_at: {type: Date, default: Date()},
	updated_at: {type: Date, default: Date()}
	})
mongoose.model('Rest', RestSchema);
var Rest = mongoose.model('Rest')

var ReviewSchema = new mongoose.Schema({
	restID: {type: String, required: [true]},
	name: {type: String, required: [true, "Your name is required!!!"], minlength: [3, "Your Name is too short.Name must be longer than 3 characters!"]},
	rating: {type: Number, required: [true], min: [1, "needs to be between 1-5"], max: [5, 'Needs to be netween 1-5']},
	review: {type: String, required: [true, "review Required!"], minlength:[3,"Review Minimum needs to be 3!!!"]},
	created_at: {type: Date, default: Date()},
	updated_at: {type: Date, default: Date()}
	})
mongoose.model('Review', ReviewSchema);
var Rev = mongoose.model('Review')




app.post('/reviews', function(req,res){
	var rev = new Rev ({
		restID: req.body.restID,
		name: req.body.name,
		rating: req.body.rating,
		review: req.body.review,
		created_at: Date(),
		updated_at: Date()
	})
	rev.save(function(err, results){
		if(err){
			console.log(err)
			res.json({message:"fail", errors:err})
		}
		else{
			console.log(results)
			res.json({message: "Success", data: results})
		}
	})
})

app.get('/reviews/:id', function(req, res){
	console.log("this is server", req.params.id)
	Rev.find({restID: req.params.id}).sort({rating: -1}).exec(function(err, reviews){
		if(err){
			console.log(err);
			res.json({message:"error", error: err})
		}
		else{
			res.json({message:"Success", data: reviews})
		}
	})
})


app.delete('/rests/:id', function(req,res){
	Rest.remove({_id: req.params.id}, function(err){
		console.log("removed Successful")
		res.json({message: "success"})
})
})

app.put('/rests/:id', function(req,res){
var opts = { runValidators: true};
console.log("this is the name", req.body.cuisine)
	Rest.update({_id: req.body._id} ,{ $set: {
		name : req.body.name, 
		cuisine: req.body.cuisine}}
		, opts, 
		function(err, rest){
		if(err){
			res.json({message:"errors", errors: err})
		}
		else{
			res.json({message:"success", data: rest})
		} 
	}
		)
	
})



app.post('/rests', function(req,res){
	// console.log("*****THIS IS RES",res)
	var rest = new Rest({
		name: req.body.name,
		cuisine: req.body.cuisine,
		created_at: Date(),
		updated_at: Date()
	})

	rest.validate()
	rest.save(function(err, results){
		if(err){
			console.log(err)
			res.json({message: "fail", errors: err})
		}
		else{
			console.log(results)
			res.json({message: "success", data: results})
		}
	})
	
})


app.get('/rests', function(req, res){
	Rest.find({}, function(err, pets){
		if(err){
			console.log(err);
			res.json({message:"error", error: err})
		}
		else{
			res.json({message:"Success", data: pets})
		}
	})
})

app.get('/rests/:id', function(req,res){
	Rest.find({_id: req.params.id}, function(err, rests){
		if(err){
			console.log(err)
		}
		else{
			res.json({message: "Success", data: rests})
		}
	})
})



app.all("*", (req, res, next) => {
	res.sendFile(path.resolve("./dojocoding/dist/index.html"))
})


app.listen(8000, function(){
	console.log("listening on port 8000, hello")
})
