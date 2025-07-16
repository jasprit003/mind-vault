import { Router } from 'express'
import { addNote, deleteNote } from '../controllers/note.controllers'
import { auth } from '../middlewares/auth.middleware'

const router = Router()

router.use(auth)
router.post('/add', addNote)
router.delete('/:id', deleteNote)

export default router
