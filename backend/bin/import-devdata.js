import * as timed from '../models'

;(async function main() {
  try {
    let customers = require('../../docker/mongodb/json/customers/data.json')

    await timed.Customer.create(customers)
    console.log('Customers created')

    for (let customer of customers) {
      let projects = getProjects(customer)
      await timed.Project.create(projects)
      console.log(`${projects.length} projects for customer "${customer.name}" created`)
    }

    await timed.User.create(require('../../docker/mongodb/json/users/data.json'))
    console.log('Users created')
  }
  catch (e) {
    console.error(e)
  }
  finally {
    process.exit() // eslint-disable-line
  }
})()

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
