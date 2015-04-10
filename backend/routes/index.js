import app        from '../src/app'
import api1       from './api/v1'
import errorRoute from './error'

app.use('/api/v1', api1)
app.use(errorRoute)
