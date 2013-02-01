[![build status](https://secure.travis-ci.org/jney/grunt-md5.png)](http://travis-ci.org/jney/grunt-md5)
# grunt-md5

[Grunt][grunt] plugin for generating `MD5` filenames.

## Getting Started

Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-md5`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-md5');
```

Then specify what files you want to generate an md5 filename in your config:

```javascript
grunt.initConfig({
  md5: {
    compile: {
      files: {
        'dest/folder': 'src/file'
      },
      options: {
        callback: function (newPath, oldPath, content) {
          // do something with the generated file
        },
        after: function (filesProcessed) {
          // The after function is called after all files are processed. (whereas
          // the callback is called once per file).
          //
          // filesProcessed are in following format:
          // [{newPath: '...', oldPath: '...', content: '...'}, ...]
        },
        keepBasename: true,
        keepExtension: true
      }
    }
  }
});
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Release History
* 0.1.5 Support for keeping the original file's basename
* 0.1.4 Compatibility with grunt 0.4
* 0.1.1 Fixing many files handling
* 0.0.1 First Release

## License
Copyright (c) 2012 Jean-Sébastien Ney & contributors
Licensed under the MIT license.
