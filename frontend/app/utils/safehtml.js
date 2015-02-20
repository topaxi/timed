export default function safehtml(pieces, ...subs) {
  return {
    safehtml: subs.reduce((html, sub, i) =>
      html + (sub.safehtml || escape(sub)) + pieces[i + 1], pieces[0])
  }
}

function escape(s) {
  return s.replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/'/g, '&#39;')
          .replace(/"/g, '&quot;')
}
