import express from 'express'
import { getPosts, createPost, updatePost } from '../controllers/posts.js'

const router = express.Router()

//Path, call back function to be executed when someone visits this route
//reached at localhost:5000/posts
router.get('/', getPosts)
router.post('/', createPost)
router.patch('/:id', updatePost)


export default router