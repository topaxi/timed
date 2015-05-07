import denodeify from 'denodeify'
import { User }  from '../models'

const read = denodeify(require('read'))

;(async function main() {
  try {
    var user = new User

    user.name = await read({ 'prompt': 'Username: ' })

    await user.setPassword(await read({ 'prompt': 'Password: ', 'silent': true }))
    await user.save()

    console.log('User', user.name, 'created')
  }
  catch (err) {
    console.error('Error %s: %s', err.code, err.message)
  }
  finally {
    process.exit()
  }
})()
