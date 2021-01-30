import * as api from '../api'

//Action creators:
//functions that return an action. An action is just an object that has the 'type' and payload


//since we are dealing with asynchronous logic we have to add 'async(dispatch)' in front
//function that returns another function so we can use async capabilities


export const getPosts = () => async (dispatch) => {
    try {
        //get response from api {data}
        //data represents the post
        const { data } = await api.fetchPosts()
        dispatch({ type: 'FETCH_ALL', payload: data })
    } catch (error) {
        console.log(error.message)
    }
}