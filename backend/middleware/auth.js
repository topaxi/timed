export default function(req, res, next) {
  if (req.isAuthenticated()) return next()

  next({ 'status': 401, 'message': 'Not authenticated!' })
}
