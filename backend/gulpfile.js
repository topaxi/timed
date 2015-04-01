var gulp             = require('gulp')
var jshint           = require('gulp-jshint')
var jscs             = require('gulp-jscs')
var istanbul         = require('gulp-istanbul')
var mocha            = require('gulp-mocha')
var coverageEnforcer = require('gulp-istanbul-enforcer');
var isparta          = require('isparta')

var src = [
  'src/**/*.js'
, 'routes/**/*.js'
, 'middleware/*.js'
, 'models/*.js'
]

var testFiles = [ 'test/**/*-test.js' ]
var reports   = [ 'lcov', 'json', 'html', 'text', 'text-summary' ]

gulp.task('instrument', function() {
  return gulp.src(src)
    .pipe(istanbul({
      instrumenter:    isparta.Instrumenter
    //, includeUntested: true
    }))
    .pipe(istanbul.hookRequire())
    .pipe(gulp.dest('./test-tmp/'))
})

gulp.task('test', [ 'lint', 'instrument' ], function(done) {
  gulp.src(testFiles)
    .pipe(mocha({ reporter: 'spec' }))
    .pipe(istanbul.writeReports(reports))
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
    .on('error', console.error)
    .on('error', end)
    .on('end',   end)

    function end() {
      done()
      // Not sure why the test doesn't end after calling "done"
      // using process.exit() as an workaround for now
      process.exit()
    }
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
