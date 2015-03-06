import app                    from '../src/app'
import { NotAuthorizedError } from '../src/error'

export default app.get('env') !== 'testing' ? auth : testAuth

export function auth(req, res, next) {
  if (req.isAuthenticated()) return next()

  next(new NotAuthorizedError)
}

export function testAuth(req, res, next) {
  if (req.headers['test-auth']) return next()

  auth.apply(this, arguments)
}
