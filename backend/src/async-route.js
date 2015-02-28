import co from 'co'

export function async(fn) {
  if (fn.length === 4) {
    return function(err, req, res, next) {
      return co(fn.call(this, err, req, res, next)).catch(next)
    }
  }

  return function(...args) {
    return co(fn.apply(this, args)).catch(args[args.length - 1])
  }
}
