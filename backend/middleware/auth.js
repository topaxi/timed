import app from '../src/app'

export default app.get('env') !== 'testing' ? auth : testAuth

export function auth(req, res, next) {
  if (req.isAuthenticated()) return next()

  next({ 'status': 401, 'message': 'Not authenticated!' })
}

export function testAuth(req, res, next) {
  if (req.headers['test-auth']) return next()

  auth.apply(this, arguments)
}
