export default function() {
  this.transition(
    this.fromRoute('project.edit.edit')
  , this.toRoute('task.index')
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

  this.transition(
    this.fromRoute('login')
  , this.use('toUp')
  , this.reverse('toDown')
  )

  this.transition(
    this.use('crossFade', { duration: 150 })
  )
}
