var gulp             = require('gulp')
var jshint           = require('gulp-jshint')
var jscs             = require('gulp-jscs')
var mocha            = require('gulp-spawn-mocha')
var coverageEnforcer = require('gulp-istanbul-enforcer');

var src = [
  'src/**/*.js'
, 'routes/**/*.js'
, 'middleware/*.js'
, 'models/*.js'
]

var testFiles = [ 'test/**/*-test.js' ]
var reports   = [ 'lcov', 'json', 'html', 'text', 'text-summary' ]

gulp.task('test', [ 'lint' ], function() {
  return gulp.src(testFiles)
    .pipe(mocha({
      reporter:  'spec'
    , compilers: 'js:babel/register'
    , istanbul:  true
    }))
    .pipe(coverageEnforcer({
      thresholds: {
        statements: 99
      , branches: 96
      , lines: 99
      , functions: 99
      }
    , coverageDirectory: 'coverage'
    , rootDirectory:     ''
    }))
})

gulp.task('lint', function() {
  return gulp.src(src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jscs({ esnext: true, configPath: '../.jscsrc' }))
})

gulp.task('setup travis', function() {
  reports = [ 'lcovonly' ]
})

gulp.task('travis', [ 'setup travis', 'test' ])

gulp.task('test-watch', function() {
  gulp.watch(src.concat(testFiles), [ 'test' ])
      .on('error', console.error)
})
