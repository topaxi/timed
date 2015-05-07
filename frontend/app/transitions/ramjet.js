/* jshint ignore:start */
import Ember  from 'ember'
import ramjet from 'ramjet'

export default function ramjetTransition({ easing = ramjet.linear, duration = 250 } = {}) {
  let oldElement = this.oldElement[0]
  let newElement = this.newElement[0]

  let promise = new Ember.RSVP.Promise(resolve => {
    show(newElement)

    ramjet.transform(oldElement, newElement, {
      easing,
      duration,
      done() {
        show(newElement)
        resolve()
      }
    })

    // Sometimes, child elements my have visibility: visible
    // which doesn't seem to cascade properly
    // TODO: This can be removed, once https://github.com/ef4/liquid-fire/pull/273
    //       is merged and published
    this.oldView.element.style.opacity = 0
    hide(oldElement)
    hide(newElement)
  })

  return promise
}

function show(el) {
  el.style.visibility = ''
}

function hide(el) {
  el.style.visibility = 'hidden'
}
