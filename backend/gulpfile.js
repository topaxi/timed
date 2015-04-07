import gulp             from 'gulp'
import jshint           from 'gulp-jshint'
import jscs             from 'gulp-jscs'
import mocha            from 'gulp-spawn-mocha'
import coverageEnforcer from 'gulp-istanbul-enforcer'

let src = [
  'src/**/*.js'
, 'routes/**/*.js'
, 'middleware/*.js'
, 'models/*.js'
]

let testFiles = [ 'test/**/*-test.js' ]
let reports   = [ 'lcov', 'json', 'html', 'text', 'text-summary' ]

gulp.task('test', [ 'lint' ], () => {
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
      , lines: 100
      , functions: 100
      }
    , coverageDirectory: 'coverage'
    , rootDirectory:     ''
    }))
})

gulp.task('lint', () => {
  return gulp.src(src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jscs({ esnext: true, configPath: '../.jscsrc' }))
})

gulp.task('setup travis', () => {
  reports = [ 'lcovonly' ]
})

gulp.task('travis', [ 'setup travis', 'test' ])

gulp.task('test-watch', () => {
  gulp.watch(src.concat(testFiles), [ 'test' ])
      .on('error', console.error)
})
