import { Router } from 'express'
import { register, login, deleteAccount } from '../controllers/auth.controllers'
import { auth } from '../middlewares/auth.middleware'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.delete('/account/:id', auth, deleteAccount)

export default router
