import gulp             from 'gulp'
import eslint           from 'gulp-eslint'
import mocha            from 'gulp-spawn-mocha'
import coverageEnforcer from 'gulp-istanbul-enforcer'

let src = [
  'src/**/*.js'
, 'routes/**/*.js'
, 'middleware/*.js'
, 'models/*.js'
]

let testFiles = [ 'test/helper.js', 'test/**/*-test.js' ]

gulp.task('test', [ 'lint' ], () => {
  return gulp.src(testFiles)
    .pipe(mocha({
      reporter:  'spec'
    , compilers: 'js:babel/register'
    , istanbul:  true
    }))
    .pipe(coverageEnforcer({
      thresholds: {
        statements: 100
      , branches:   100
      , lines:      100
      , functions:  100
      }
    , coverageDirectory: 'coverage'
    , rootDirectory:     ''
    }))
})

gulp.task('lint', () => {
  return gulp.src(src.concat(testFiles))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
})

gulp.task('travis', [ 'test' ])

gulp.task('test-watch', [ 'test' ], () => {
  gulp.watch(src.concat(testFiles), [ 'test' ])
      .on('error', console.error)
})
