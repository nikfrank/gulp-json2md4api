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

function json2md(src, opt, cb){
    // here render the md.
    src = eval('('+src+')');
    var template = 

"# "+src.title+"\n\n"+src.missionStatement+
"\n```js\n"+
src.firstExample+
"\n```\n\n\n"+
'include these scripts\n\n'+
"```html\n"+
src.scripts.map(function(s){
    return '<script src=\"'+s+'\"></script>';
}).join('\n')+
"\n```\n\n"+
"put this in your Caniconfig\n\n"+
"```js\n"+syntaxHighlight(src.configExample)+
"\n```\n\n"+

"see [`demo-caniconfig.js`](https://github.com/nikfrank/canijs/blob/master/src/docs/democonfig.js)\n"+
"for examples of all the config options for all the modules\n\n\n"+

"## Getting Started\n"+
"---\n\n"+
"```\n"+
"npm i -S canijs\n"+
"```\n\n"+

"then include the aws sdk, canijs core, cani-dynamo, and your Caniconfig.js of course\n\n\n"+


"## Basic use\n"+
"---\n\n"+

"```js\n"+
src.basicUse.join('\n```\n```js\n')+
"\n```\n\n"+

"Read the AWS [docs](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html)\n"+
"to learn about indices (GSI) that will let you query your data how you please\n\n\n"+


"## Examples\n"+
"---\n\n"+

"Available at ((link))\n\n\n"+


"## Full API\n"+
"---\n\n"+

"...'";

    cb(null, template);

}

function syntaxHighlight(json){
    json = JSON.stringify(json, null, 4);
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return match;//'<span class="' + cls + '">' + match + '</span>';
    });
}
