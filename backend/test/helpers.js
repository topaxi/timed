import mochaMongoose from 'mocha-mongoose'

export const clearDatabase = mochaMongoose('mongodb://127.0.0.1/timed-testing')
