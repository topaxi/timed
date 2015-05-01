/* jshint ignore:start */
import Ember  from 'ember'
import ramjet from 'ramjet'

export default function ramjetTransition({ easing = ramjet.linear, duration = 250 } = {}) {
  let a = this.oldElement[0]
  let b = this.newElement[0]

  let promise = new Ember.RSVP.Promise((resolve) => {
    b.style.visibility = ''

    ramjet.transform(a, b, {
      easing,
      duration,
      done() {
        b.style.visibility = ''
        resolve()
      }
    })

    // Sometimes, child elements my have visibility: visible
    // which doesn't seem to cascade properly
    // TODO: This can be removed, once https://github.com/ef4/liquid-fire/pull/273
    //       is merged and published
    this.oldView.element.style.opacity = 0
    a.style.visibility = 'hidden'
    b.style.visibility = 'hidden'
  })

  return promise
}
