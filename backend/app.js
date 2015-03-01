#!/usr/bin/env node

require('babel/register')({ 'blacklist': [ 'react', 'regenerator' ] })
require('./src/main')
