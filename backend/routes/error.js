import app           from '../src/app'
import { HttpError } from '../src/error'

export default function(err, req, res, next) {
  let error = err

  if (!(err instanceof Error)) {
    error = new HttpError(err.message, err.status)
  }

  res.status(error.status)
  res.send({
    message: error.message
  , status:  error.status
  , error:   formatError(error)
  })
}

function formatError(err) {
  if (app.get('env') !== 'development') {
    return {}
  }

  let { name, message, stack } = err

  return { name, message, stack }
}
