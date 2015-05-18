import Ember     from 'ember'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false, speed: 250 })

export default Ember.Mixin.create({
  actions: {
    loading() {
      NProgress.start()
      this.router.one('didTransition', () => NProgress.done())
      return true
    }
  , error() {
      NProgress.done()
      return true
    }
  }
})
