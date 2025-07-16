import { Schema, model, Types } from 'mongoose'

const noteSchema = new Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  tags: [{ type: Types.ObjectId, ref: 'Tag' }],
  userId: { type: Types.ObjectId, ref: 'User', required: true },
})

export const Note = model('Note', noteSchema)
