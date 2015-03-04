import app from '../src/app'

let env = app.get('env')

export default function(err, req, res, next) {
  let status = err.status || 500

  res.status(status)
  res.send({
    message: err.message
  , status
  , error: formatError(err)
  })
}

function formatError(err) {
  if (env !== 'development') {
    return {}
  }

  let { name, message, stack } = err

  return { name, message, stack }
}
