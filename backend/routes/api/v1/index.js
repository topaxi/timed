import { Router } from 'express'

var router = new Router
export default router

router.use('/projects',    require('./project'))
router.use('/tasks',       require('./task'))
router.use('/customers',   require('./customer'))
router.use('/teams',       require('./team'))
router.use('/assignments', require('./assignment'))
router.use('/attendances', require('./attendance'))
router.use('/users',       require('./user'))
router.use('/',            require('./login'))
