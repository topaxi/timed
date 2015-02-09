import Ember from 'ember'

export default Ember.Object.extend({

  searchIssues(term = '') {
    let data = this.project.get('tracker.data')
    let q    = `${term} repo:${data.repo}`

    return Ember.$.ajax({
      url: 'https://api.github.com/search/issues'
    , data: { q }
    , headers: {
        'Authorization': `token ${data.apikey}`
      }
    }).then(res => res.items.map(i => i.title))
  }
})
