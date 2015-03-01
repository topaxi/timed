#!/usr/bin/env node

require('babel/register')({ 'blacklist': [ 'react' ] })
require('./src/main')
