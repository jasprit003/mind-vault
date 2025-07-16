import { Types } from 'mongoose'
import { Request, Response } from 'express'
import { Note } from '../models/note.model'

interface NoteRequest extends Request {
  user?: {
    _id: Types.ObjectId
    name: string
    email: string
    password: string
  }
}

export const addNote = async (req: NoteRequest, res: Response) => {
  try {
    const { title, link } = req.body
    const userId = req.user._id

    const note = new Note({ title, link, userId })
    await note.save()
    console.log(note)

    res.status(201).json({ message: 'Note added successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const deleteNote = async (req: NoteRequest, res: Response) => {
  try {
    const noteId = req.params.id
    const userId = req.user._id.toString()

    const deleted = await Note.findOneAndDelete({ _id: noteId, userId })
    if (!deleted) {
      res.status(401).json({ message: 'Note not found' })
    }

    res.status(203).json({ message: 'Note deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}
