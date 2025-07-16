import { Request, Response } from 'express'
import { User } from '../models/user.model'
import { hashPassword, checkPassword } from '../utils/hash'
import { signToken } from '../utils/token'
import { CustomRequest } from '../types'

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already registered' })
    }

    const hashed = await hashPassword(password)

    const user = new User({ name, email, password: hashed })
    await user.save()

    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    res.status(500).json({ mesaage: 'server error', error })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (!existingUser) {
      return res.status(400).json({ message: 'Invalid email' })
    }

    const isPasswordCorrect = await checkPassword(
      password,
      existingUser.password,
    )
    if (!isPasswordCorrect) {
      res.status(400).json({ message: 'Incorrect password' })
    }

    const token = signToken(existingUser._id.toString())

    res.status(200).json({ message: 'Login Successful', token })
  } catch (error) {
    console.log(error)
  }
}

export const deleteAccount = async (req: CustomRequest, res: Response) => {
  try {
    const id = req.params.id
    if (!id) {
      return res.json(404).json({ message: 'No user user id Found' })
    }

    const deletedUser = await User.findOneAndDelete({ _id: id })

    if (!deletedUser) {
      return res.status(404).json({ message: 'No user found' })
    }

    res.status(200).json({ message: 'User deleted', deletedUser })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}
