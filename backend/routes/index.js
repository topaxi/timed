import app from '../src/app'

app.use('/api/v1', require('./api/v1'))
app.use(require('./error'))
