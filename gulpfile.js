var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    tsProject = ts.createProject('tsconfig.json');

gulp.task('compile', function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('./'));
});

gulp.task('default', ['compile'], function () {

});
