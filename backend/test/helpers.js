import chai, { expect } from 'chai'
import chaiAsPromised   from 'chai-as-promised'
import mochaMongoose    from 'mocha-mongoose'

chai.use(chaiAsPromised)

global.expect = expect

export const clearDatabase = mochaMongoose('mongodb://127.0.0.1/timed-testing')
