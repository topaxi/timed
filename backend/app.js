#!/usr/bin/env node

require('6to5/register', { 'blacklist': [ 'react' ] })
require('./src/main')
