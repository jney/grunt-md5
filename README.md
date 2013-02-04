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
        keepBasename: true,
        keepExtension: true,
        afterEach: function (fileChange) {
          // Called once for each file processed by the md5 task.

          // fileChange is in following format:
          //
          // {
          //   newPath: '...',
          //   oldPath: '...',
          //   content: '...'
          // }
          //
          // Where newPath is the path with MD5, oldPath is the original path,
          // and content is the file content.
        },
        after: function (fileChanges) {
          // Called after all of the files are processed by the md5 task.

          // fileChanges is an array, holding the same values are the afterEach callback.
          // [{newPath: '...', oldPath: '...', content: '...'}, ...]
        }
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
