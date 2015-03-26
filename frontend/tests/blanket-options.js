/* globals blanket */

blanket.options({
  modulePrefix:     'timed'
, filter:           '//.*timed/.*/'
, antifilter:       '//.*(tests|template).*/'
, loaderExclusions: []
, enableCoverage:   true
})
