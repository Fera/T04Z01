var gulp = require("gulp"),
	sass = require("gulp-sass"),
	autoprefixer = require("gulp-autoprefixer"),
	plumber = require("gulp-plumber"),
	browserSync = require("browser-sync"),
	del = require("del"),
	useref = require("gulp-useref");

gulp.task("hello", function(){
	console.log("hello");
});

gulp.task("css", function(){

	gulp.src("src/sass/main.scss")
		.pipe(plumber())
		.pipe(sass.sync()) //jeśli ma dobrze działać z plumber musi być sass.sync
		.pipe(autoprefixer({
			browsers: ["last 5 version", "IE 9"]
		}))
		.pipe(gulp.dest("src/css"))
		.pipe(browserSync.stream());

});

gulp.task("server", function(){

	browserSync.init({
		server: "src/"
	});
});


gulp.task("watch", function(){

	gulp.watch("src/sass/**/*.scss", ['css']);
	gulp.watch(["src/*.html", "src/**/*.js"], browserSync.reload);
});

gulp.task("clean", function(){
	del("dist/");
});

gulp.task("html", function(){

	gulp.src('src/*.html')
		.pipe(useref())
		.pipe(gulp.dest('dist'));
});

gulp.task("default", ["css", "server", "watch"]);