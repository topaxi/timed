import chai, { expect } from 'chai'
import chaiAsPromised   from 'chai-as-promised'
import * as model       from '../models'

chai.use(chaiAsPromised)

global.expect = expect

beforeEach(async() => {
  let all = {}

  await* [
    model.Activity  .remove(all)
  , model.Assignment.remove(all)
  , model.Attendance.remove(all)
  , model.Customer  .remove(all)
  , model.Project   .remove(all)
  , model.Setting   .remove(all)
  , model.Task      .remove(all)
  , model.Team      .remove(all)
  , model.User      .remove(all)
  ]
})
