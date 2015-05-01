import Ember                        from 'ember'
import moment                       from 'moment'
import startApp                     from '../../helpers/start-app'
import { moduleForComponent, test } from 'ember-qunit'

let App
let store

moduleForComponent('attendance-list', 'AttendanceListComponent', {
  needs: [
    'component:date-picker'
  , 'model:user'
  , 'model:attendance'
  , 'model:activity'
  , 'helper:date-format'
  , 'helper:date-duration'
  ]
, setup() {
    App   = startApp()
    store = App.__container__.lookup('store:main')
  }
, teardown() {
    Ember.run(() => App.destroy())
  }
})

test('it renders', function(assert) {
  assert.expect(2)

  Ember.run(() => {
    let user = store.createRecord('user')

    let component = this.subject({ user })
    assert.equal(component._state, 'preRender')

    this.render()
    assert.equal(component._state, 'inDOM')
  })
})

test('it forwards the openModal action', function(assert) {
  assert.expect(1)

  Ember.run(() => {
    let user      = store.createRecord('user')
    let component = this.subject({ user })

    component.send('openModal', {})

    assert.throws(() => component.send('something else'))
  })
})

test('it lists todays attendances', function(assert) {
  assert.expect(3)

  let component

  function attend(obj) {
    return store.createRecord('attendance', obj)
  }

  function createAttendances(user) {
    attend({ user, from: moment('2014-02-01'), to: moment('2014-02-01') })
    attend({ user, from: moment('2014-02-01'), to: moment('2014-02-02') })
    attend({ user, from: moment('2014-02-01 00:00'), to: moment('2014-02-02 01:00') })
    attend({ user, from: moment('2014-01-28 00:00'), to: moment('2014-02-02 01:00') })
  }

  Ember.run(() => {
    let day  = moment('2014-02-01').startOf('day')
    let user = store.createRecord('user')

    createAttendances(user)

    component = this.subject({ user })
    component.set('day', day)

    assert.equal(component.get('attendances').length, 3)

    this.render()

    assert.equal(component._state, 'inDOM')
    assert.equal(component.$('.attendance-list-attendance').length, 3)
  })
})

test('it marks activities to review with a warning class', function(assert) {
  assert.expect(2)

  let component

  function attend(obj) {
    return store.createRecord('attendance', obj)
  }

  function activity(obj) {
    return store.createRecord('activity', obj)
  }

  function createAttendances(user) {
    let attendance = attend({ user, from: moment('2014-02-01'), to: moment('2014-02-01') })

    activity({ attendance, from: moment('2014-02-01'), to: moment('2014-02-01'), review: true })
    activity({ attendance, from: moment('2014-02-01'), to: moment('2014-02-01'), review: false })
    activity({ attendance, from: moment('2014-02-01'), to: moment('2014-02-01'), review: null })
  }

  Ember.run(() => {
    let day  = moment('2014-02-01').startOf('day')
    let user = store.createRecord('user')

    createAttendances(user)

    component = this.subject({ user })
    component.set('day', day)

    this.render()

    assert.equal(component._state, 'inDOM')
    assert.equal(component.$('.attendance-list-activity.warning').length, 1)
  })
})

test('it marks activities not to account with a danger class', function(assert) {
  assert.expect(2)

  let component

  function attend(obj) {
    return store.createRecord('attendance', obj)
  }

  function activity(obj) {
    return store.createRecord('activity', obj)
  }

  function createAttendances(user) {
    let attendance = attend({ user, from: moment('2014-02-01'), to: moment('2014-02-01') })

    activity({ attendance, from: moment('2014-02-01'), to: moment('2014-02-01'), review: true, nta: true })
    activity({ attendance, from: moment('2014-02-01'), to: moment('2014-02-01'), review: false, nta: true })
    activity({ attendance, from: moment('2014-02-01'), to: moment('2014-02-01'), review: false, nta: false })
    activity({ attendance, from: moment('2014-02-01'), to: moment('2014-02-01'), review: null, nta: null })
    activity({ attendance, from: moment('2014-02-01'), to: moment('2014-02-01'), review: false, nta: null })
  }

  Ember.run(() => {
    let day  = moment('2014-02-01').startOf('day')
    let user = store.createRecord('user')

    createAttendances(user)

    component = this.subject({ user })
    component.set('day', day)

    this.render()

    assert.equal(component._state, 'inDOM')
    assert.equal(component.$('.attendance-list-activity.danger').length, 2)
  })
})
