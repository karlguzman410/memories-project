//handler for our routes
import mongoose from 'mongoose'
import PostMessage from '../models/postMessage.js'

export const getPosts = async (request, response) => {
    try {
        const postMessages = await PostMessage.find()
        console.log(postMessages)
        response.status(200).json(postMessages)
    } catch (error) {
        response.status(404).json({ message: error.message })
    }
}

//https://restapitutorial.com/httpstatuscodes.html

export const createPost = async (request, response) => {
    const post = request.body
    const newPostMessage = new PostMessage({ ...post, creator: request.userId, createdAt: new Date().toISOString() })
    try {
        await newPostMessage.save()
        response.status(201).json(newPostMessage)
    } catch (error) {
        response.status(409).json({ message: error.message })
    }
}

export const updatePost = async (request, response) => {
    const { id: _id } = request.params
    const post = request.body
    if (!mongoose.Types.ObjectId.isValid(_id)) return response.status(404).send('No post with that id')

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true })

    response.json(updatedPost)

}

export const deletePost = async (request, response) => {
    const { id } = request.params
    if (!mongoose.Types.ObjectId.isValid(id)) return response.status(404).send('No post with that id')

    await PostMessage.findByIdAndRemove(id)

    console.log('DELETE')

    response.json({ message: 'Post deleted successfully' })

}

export const likePost = async (request, response) => {
    const { id } = request.params

    //check for user authentication
    if (!request.userId) return response.json({ message: "Unauthenticated" })

    //check if post id is valid 
    if (!mongoose.Types.ObjectId.isValid(id)) return response.status(404).send('No post with that id')

    //this returns a post
    const post = await PostMessage.findById(id)

    //check if userId is already in the like section
    const index = post.likes.findIndex((id) => id === String(request.userId))

    //if the userId is not found in the likes.id
    if (index === -1) {
        //like
        post.likes.push(request.userId)
    } else {
        //delete the existing like from this userId
        //filter returns all the likes besides the like from the current user (userId)
        post.likes = post.likes.filter((id) => id !== String(request.userId))
    }

    //pass in the updates. Increment the like count
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })

    response.json(updatedPost)
}