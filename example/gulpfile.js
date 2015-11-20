var gulp = require('gulp'),
json2md = require('../index');

gulp.task('json2md', function () {
    return gulp.src('api.json')
	.pipe(json2md())
        .pipe(gulp.dest(''));
});


gulp.task('default', function(){
    gulp.run('json2md');
});
