const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-Sync');

function style() {
    return gulp.src('./scss/**/*.scss').pipe(sass()).pipe(gulp.dest('./css'))
}

function watch() {
    gulp.watch('./scss/**/*.scss', style)
}
exports.style = style;
exports.watch = watch;