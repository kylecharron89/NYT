var gulp = require("gulp");
var concat = require("gulp-concat");
var minify = require("gulp-clean-css");
var rename = require("gulp-rename");
var sass = require("gulp-sass");

gulp.task("cssminify", function(){
  console.log("asdf");
  return gulp.src("assets/style/main.scss")
  .pipe(sass().on('error', sass.logError))
  .pipe(minify())
  .pipe(rename("min.style.css"))
  .pipe(gulp.dest("./dist"))
});
