'use strict';
var gutil = require('gulp-util');
var through = require('through2');

module.exports = function (options) {
    return through.obj(function (file, enc, cb) {
	if (file.isNull()) {
	    cb(null, file);
	    return;
	}

	if (file.isStream()) {
	    cb(new gutil.PluginError('gulp-json2md4api', 'Streaming not supported'));
	    return;
	}

	json2md(file.contents.toString(), options, function (err, data) {
	    if (err) {
		cb(new gutil.PluginError('gulp-json2md4api', err, {fileName: file.path}));
		return;
	    }

	    file.contents = new Buffer(data);
	    file.path = gutil.replaceExtension(file.path, '.md');

	    cb(null, file);
	});
    });
};

module.exports.marked = marked;

function json2md(src, opt, cb){
    // here render the md.
}
