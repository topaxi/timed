import app from '../src/app'

export default function(err, req, res, next) {
  let { status = 500 } = err

  res.status(status)
  res.send({
    message: err.message
  , status
  , error: formatError(err)
  })
}

function formatError(err) {
  if (app.get('env') !== 'development') {
    return {}
  }

  let { name, message, stack } = err

  return { name, message, stack }
}
