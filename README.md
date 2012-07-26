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
        callback: function (newPath, oldPath) {
          // do something with the generated file
        },
        keepExtension: true
      }
    }
  }
});
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Release History
* 0.0.1 First Release

## License
Copyright (c) 2012 Jean-Sébastien Ney
Licensed under the MIT license.
