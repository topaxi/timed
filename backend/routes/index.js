import app from '../src/main'

app.use('/api/v1', require('./api/v1'))
app.use(require('./error'))
