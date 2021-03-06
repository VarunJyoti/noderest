var gulp = require("gulp");
var nodemon = require("gulp-nodemon");
var mocha = require("gulp-mocha");
var env = require('gulp-env');
var supertest = require('supertest');
gulp.task("default", function(){
	nodemon({
		script: 'app.js',
		ext: 'js',
		env: {
			PORT: 8000
		},
		ignores: ['./node_modules']
	}).on('restart', function(){
		console.log("restarted")
	})
});

gulp.task("test", function(){
	env({vars: {ENV:'Test'}});
	gulp.src("tests/*.js", { read: false})
	.pipe(mocha({
		reporter: 'nyan'
	}))
})