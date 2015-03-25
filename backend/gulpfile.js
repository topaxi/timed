var gulp             = require('gulp')
var jshint           = require('gulp-jshint')
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

gulp.task('test', [ 'lint' ], function(done) {
  gulp.src(src)
    .pipe(istanbul({
      instrumenter:    isparta.Instrumenter
    //, includeUntested: true
    }))
    .pipe(istanbul.hookRequire())
    .pipe(gulp.dest('test-tmp/'))
    .on('finish', function() {
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
        .on('error', function(err) {
          console.error(err.message)
          done()
          process.exit(1)
        })
        .on('end', function() {
          done()
          process.exit()
        })
    })
})

gulp.task('lint', function() {
  return gulp.src(src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
})

gulp.task('setup travis', function() {
  reports = [ 'lcovonly' ]
})

gulp.task('travis', [ 'setup travis', 'test' ])

gulp.task('test-watch', function() {
  gulp.watch(src.concat(testFiles), [ 'test' ])
})
