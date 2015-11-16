# gulp-json2md4api
> JSON to markdown

## Install

```
$ npm install --save-dev gulp-json2md4api
```


## Usage

```js
var gulp = require('gulp');
var json2md = require('gulp-json2md4api');

gulp.task('default', function () {
	return gulp.src('api.json')
		.pipe(json2md())
		.pipe(gulp.dest('docs'));
});
```


## examples

see github.com/nikfrank/canijs

## License

MIT © [nik frank](http://nikfrank.com)
