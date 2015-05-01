export default function() {
  this.transition(
    this.fromRoute('project.edit.edit')
  , this.toRoute([ 'task.index', 'task.edit' ])
  , this.use('toLeft')
  , this.reverse('toRight')
  )

  this.transition(
    this.fromRoute('team.edit.edit')
  , this.toRoute('team.edit.manage')
  , this.use('toLeft')
  , this.reverse('toRight')
  )

  this.transition(
    this.fromRoute('user.edit.edit')
  , this.toRoute('user.edit.worktime')
  , this.use('toLeft')
  , this.reverse('toRight')
  )

  let indexEditExplodeName = {
    matchBy: 'data-model-id'
  , use:     [ 'ramjet' ]
  }
  this.transition(
    this.fromRoute([ 'project.index', 'customer.index', 'team.index', 'user.index' ])
  , this.toRoute([ 'project.edit', 'customer.edit', 'team.edit', 'user.edit' ])
  , this.use('explode', indexEditExplodeName, { pickOld: 'h1', use: [ 'toUp' ] })
  , this.reverse('explode', indexEditExplodeName, { pickNew: 'h1', use: [ 'toDown' ] })
  )

  this.transition(
    this.fromRoute('login')
  , this.use('toUp')
  , this.reverse('toDown')
  )

  this.transition(
    this.use('crossFade', { duration: 150 })
  )
}
