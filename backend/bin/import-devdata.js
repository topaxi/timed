import * as timed from '../models'

;(async function main() {
  try {
    await timed.Customer.create(getCustomers())
    console.log('Customers created')

    for (let customer of getCustomers()) {
      let projects = getProjects(customer)
      await timed.Project.create(projects)
      console.log(`${projects.length} projects for customer "${customer.name}" created`)
    }

    await timed.User.create(getUsers())
    console.log('Users created')

    await timed.Team.create(getTeams())
    console.log('Teams created')

    await timed.TaskTemplate.create(getTaskTemplates())
    console.log('Task templates created')
  }
  catch (e) {
    console.error(e)
  }
  finally {
    process.exit() // eslint-disable-line
  }
})()

function getCustomers() {
  return require('../../docker/mongodb/json/customers/data.json')
}

function getUsers() {
  return require('../../docker/mongodb/json/users/data.json')
}

function getTaskTemplates() {
  return require('../../docker/mongodb/json/task-templates/data.json')
}

function getTeams() {
  let teams = require('../../docker/mongodb/json/teams/data.json')

  for (let team of teams) {
    team.users = getRandomSubarray(getUsers(), getRandomInt(3, 20))
  }

  return teams
}

function getProjects(customer) {
  let projects = require('../../docker/mongodb/json/projects/data.json')

  projects = getRandomSubarray(projects, getRandomInt(5, 80))

  projects.forEach(project => project.customer = customer._id)

  return projects
}

function getRandomInt(min, max) {
  return ~~(Math.random() * (max - min + 1)) + min
}

function getRandomSubarray(arr, size) {
  let shuffled = arr.slice(0), i = arr.length, min = i - size, temp, index

  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random())
    temp = shuffled[index]
    shuffled[index] = shuffled[i]
    shuffled[i] = temp
  }

  return shuffled.slice(min)
}
