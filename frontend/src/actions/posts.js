import { CREATE, UPDATE, DELETE, FETCH_ALL } from '../constants/actionTypes'
import * as api from '../api/index'


//Action creators:
//functions that return an action. An action is just an object that has the 'type' and payload


//since we are dealing with asynchronous logic we have to add 'async(dispatch)' in front
//function that returns another function so we can use async capabilities




export const getPosts = () => async (dispatch) => {
    try {
        //get response from api {data}
        //data represents the post
        const { data } = await api.fetchPosts()
        dispatch({ type: FETCH_ALL, payload: data })
    } catch (error) {
        console.log(error.message)
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post)
        dispatch({ type: CREATE, payload: data })
    } catch (error) {
        console.log(error)
    }

}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post)
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)
        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error)
    }
}


//Like functionality
export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id)
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error)
    }
}