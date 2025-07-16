import { Response } from 'express'
import { CustomRequest } from '../types'
import { Note } from '../models/note.model'

export const addNote = async (req: CustomRequest, res: Response) => {
  try {
    const { title, link } = req.body
    const userId = req.user._id
    if (!title || !link) {
      return res
        .status(404)
        .json({ message: 'please provide correct input fields' })
    }

    const note = new Note({ title, link, userId })
    await note.save()

    res.status(201).json({ message: 'Note added successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const deleteNote = async (req: CustomRequest, res: Response) => {
  try {
    const noteId = req.params.id
    const userId = req.user._id.toString()

    const deleted = await Note.findOneAndDelete({ _id: noteId, userId })
    if (!deleted) {
      return res.status(404).json({ message: 'Note not found' })
    }

    res.status(200).json({ message: 'Note deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}
