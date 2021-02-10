import React, { useState, useEffect } from 'react'
import useStyles from './styles'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase64 from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { createPost } from '../../actions/posts'
import { updatePost } from '../../actions/posts'
import { useSelector } from 'react-redux'

//Get the current ID of the post


const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles()

    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null)

    const user = JSON.parse(localStorage.getItem('profile'))

    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    })

    useEffect(() => {
        if (post) setPostData(post)
    }, [post])

    const dispatch = useDispatch()

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (currentId === 0) {
            dispatch(createPost({ ...postData, name: user?.result?.name }))
        } else {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }))
        }
        clear()
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please sign in to create and post a memory!
                </Typography>
            </Paper>
        )
    }

    const clear = () => {
        setCurrentId(0)
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        })
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6"> {currentId ? 'Editing a memory' : 'Creating a memory'} </Typography>
                <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(event) => setPostData({ ...postData, title: event.target.value })} />
                <TextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    value={postData.message}
                    onChange={(event) => setPostData({ ...postData, message: event.target.value })} />
                <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(event) => setPostData({ ...postData, tags: event.target.value.split(',') })} />
                <div className={classes.fileInput}>
                    <FileBase64
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                    <Button className={classes.buttonSubmit} variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                </div>
            </form>
        </Paper>

    )
}

export default Form