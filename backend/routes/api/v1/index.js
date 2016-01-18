import { Router } from 'express'
import auth       from '../../../middleware/auth'

let router = new Router
export default router

export let authRouter = new Router
authRouter.use(auth)

router.use(require('./login').default)
router.use(authRouter)

authRouter.use(require('./project').default)
authRouter.use(require('./task').default)
authRouter.use(require('./customer').default)
authRouter.use(require('./team').default)
authRouter.use(require('./assignment').default)
authRouter.use(require('./attendance').default)
authRouter.use(require('./user').default)
authRouter.use(require('./init').default)
authRouter.use(require('./task-template').default)
