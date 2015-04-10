import { Router } from 'express'
import auth       from '../../../middleware/auth'

let router = new Router
export default router

export let authRouter = new Router
authRouter.use(auth)

router.use(require('./login'))
router.use(authRouter)

authRouter.use(require('./project'))
authRouter.use(require('./task'))
authRouter.use(require('./customer'))
authRouter.use(require('./team'))
authRouter.use(require('./assignment'))
authRouter.use(require('./attendance'))
authRouter.use(require('./user'))
authRouter.use(require('./init'))
