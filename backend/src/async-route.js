import co from 'co'

export function async(fn) {
  return function(...args) {
    return co(fn.apply(this, args)).catch(args[args.length - 1])
  }
}
