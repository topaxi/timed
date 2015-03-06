import app           from '../src/app'
import { HttpError } from '../src/error'

export default function(err, req, res, next) {
  if (!(err instanceof Error)) {
    err = new HttpError(err.message, err.status)
  }

  res.status(err.status)
  res.send({
    message: err.message
  , status:  err.status
  , error:   formatError(err)
  })
}

function formatError(err) {
  if (app.get('env') !== 'development') {
    return {}
  }

  let { name, message, stack } = err

  return { name, message, stack }
}
