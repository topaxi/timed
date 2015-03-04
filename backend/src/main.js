import app from './app'

export default app

app.server.listen(app.get('port'), () =>
  console.log('Timed server version %s listening on port %d'
  , app.get('version')
  , app.get('port')
  )
)
