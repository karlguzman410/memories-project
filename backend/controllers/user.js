import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

export const signin = async (request, response) => {
    console.log('reached controller signin()')
    const { email, password } = request.body
    try {
        //check for existingUser
        const existingUser = await User.findOne({ email })
        if (!existingUser) return response.status(404).json({ message: "User doesn't exist. That email is not associated with any accounts" })

        //check for password entered
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordCorrect) return response.status(400).json({ message: "Invalid credentials: Incorrect password" })

        //create token
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" })

        //return 
        response.status(200).json({ result: existingUser, token })
    } catch (error) {
        response.status(500).json({ message: 'Something went wrong' })
    }
}


export const signup = async (request, response) => {
    const { email, password, confirmPassword, firstName, lastName } = request.body

    try {
        //check for existingUser
        const existingUser = await User.findOne({ email })
        if (existingUser) return response.status(400).json({ message: "User with this email already exists." })

        //check for password and confirmPassword match
        if (password !== confirmPassword) return response.status(400).json({ message: "Passwords don't match" })

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 12)

        //create the user
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })

        //create the token
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" })

        //return the user
        response.status(200).json({ result: result, token })

    } catch (error) {
        response.status(500).json({ message: 'Something went wrong' })
    }
}