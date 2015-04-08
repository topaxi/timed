// Extend from String so we don't have to dereference
// from every safehtml tag we're using.
// Example: safehtml`foo` vs safehtml`foo`.safehtml
export class SafeHTML extends String {

  constructor(pieces, subs) {
    // Using this is not valid before super call...
    let safehtml = process(pieces, subs)

    super(safehtml)

    this.safehtml = safehtml

    // Mimic string for Object.prototype.toString.call(new SafeHTML(''))
    this[Symbol.toStringTag] = 'String'

    // Some engines are unable to properly extend
    // from String. This causes SafeHTML#length to be 0
    // Redefine length with the proper string length.
    Object.defineProperty(this, 'length', { value: this.safehtml.length })
  }

  // Fix to string cast in engines which don't properly
  // support subclassing String.
  valueOf() {
    return this.safehtml
  }

  // Overwrite toString or we get
  // TypeError: Called toString on an incompatible object
  toString() {
    return this.safehtml
  }
}

function process(pieces, subs) {
  return subs.reduce((html, sub, i) =>
    html + toSafeString(sub) + pieces[i + 1], pieces[0])
}

// safehtml escapes all substitution except instances
// of SafeHTML or objects with a property called safehtml.
export default function safehtml(pieces, ...subs) {
  return new SafeHTML(pieces, subs)
}

function toSafeString(s) {
  if (s == null) {
    return ''
  }

  if (s.safehtml) {
    return s.safehtml
  }

  return escape(s)
}

export function escape(s) {
  // https://www.owasp.org/index.php/XSS_%28Cross_Site_Scripting%29_Prevention_Cheat_Sheet
  return String(s).replace(/&/g,  '&amp;')
                  .replace(/</g,  '&lt;')
                  .replace(/>/g,  '&gt;')
                  .replace(/'/g,  '&#39;')
                  .replace(/"/g,  '&quot;')
                  .replace(/\//g, '&#x2f;')
}
