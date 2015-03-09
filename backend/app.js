#!/usr/bin/env node

require('babel/register')({ 'blacklist': [
  'react'
, 'es6.forOf'
, 'regenerator'
] })

require('./src/main')
