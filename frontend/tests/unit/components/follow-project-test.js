import Ember                        from 'ember'
import startApp                     from '../../helpers/start-app'
import { moduleForComponent, test } from 'ember-qunit'

let App
let store

moduleForComponent('follow-project', 'FollowProjectComponent', {
  needs: [ 'model:project', 'model:user' ]
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
    let project = store.createRecord('project')
    let session = { user: Ember.Object.create() }

    let component = this.subject({ project, session })
    assert.equal(component._state, 'preRender')

    this.render()
    assert.equal(component._state, 'inDOM')
  })
})

test('it updates the tooltip', function(assert) {
  assert.expect(2)

  Ember.run(() => {
    let project = store.createRecord('project', { name: 'Proejct 1' })
    let session = { user: Ember.Object.create() }

    let component = this.subject({ project, session })

    this.render()

    let $tip = component.$('.tip')
    assert.equal($tip.prop('title'), 'Follow Proejct 1')

    project.set('name', 'Project 1')

    $tip.trigger('mouseover')

    assert.equal($tip.parent().find('.tooltip').text(), 'Follow Project 1')
  })
})

test('it sets the isFollowing attribute', function(assert) {
  assert.expect(2)

  Ember.run(() => {
    let project = store.createRecord('project', { name: 'Project 1' })
    let session = { user: Ember.Object.create({ projects: [ project ] }) }

    let component = this.subject({ project, session })

    this.render()

    assert.ok(component.get('isFollowing'))

    let $tip = component.$('.tip')
    assert.equal($tip.prop('title'), 'Unfollow Project 1')
  })
})

test('it updated the users projects', function(assert) {
  assert.expect(4)

  let user
  let component

  Ember.run(() => {
    let project = store.createRecord('project', { name: 'Project 1' })
    user    = store.createRecord('user')
    let session = Ember.Object.create({ user })

    component = this.subject({ project, session })

    this.render()
  })

  andThen(() => {
    click(component.$('button'))
  })

  andThen(() => {
    assert.equal(user.get('projects.length'), 1)
    assert.equal(component.get('isFollowing'), true)
  })

  andThen(() => {
    click(component.$('button'))
  })

  andThen(() => {
    assert.equal(user.get('projects.length'), 0)
    assert.equal(component.get('isFollowing'), false)
  })
})
