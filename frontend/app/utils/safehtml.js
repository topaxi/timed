// Extend from String so we don't have to dereference
// from every safehtml tag we're using.
// Example: safehtml`foo` vs safehtml`foo`.safehtml
export class SafeHTML extends String {

  constructor(pieces, subs) {
    this.safehtml = this.process(pieces, subs)

    super(this.safehtml)

    // Some engines are unable to properly extend
    // from String. This causes SafeHTML#length to be 0
    // Redefine length with the proper string length.
    Object.defineProperty(this, 'length', { value: this.safehtml.length })
  }

  process(pieces, subs) {
    return subs.reduce((html, sub, i) =>
      html + toSafeString(sub) + pieces[i + 1], pieces[0])
  }

  valueOf() {
    // Fix to string cast in engines which don't properly
    // support subclassing String.
    return this.safehtml
  }
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
  return String(s).replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  .replace(/'/g, '&#39;')
                  .replace(/"/g, '&quot;')
}
