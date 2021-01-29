import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/posts.js'

const app = express()

//general setup
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

//cors
app.use(cors())

//mongodb.com/cloud/atlas
//establish the connection to the db

//use express middleware to connect to application
//1st param, set up starting path for all the routes inside postjs
//every route inside of postRoutes will start with 'posts'
app.use('/posts', postRoutes)

const CONNECTION_URL = 'mongodb+srv://kguzman0410:kguzman0410123@cluster0.pxqwe.mongodb.net/<dbname>?retryWrites=true&w=majority'

//
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)))
    .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false)