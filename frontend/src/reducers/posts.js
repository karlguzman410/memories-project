//a reducer is a function that accepts the state and action
//state needs to be initialized

export default (posts = [], action) => {
    //switch case for the action type
    switch (action.type) {
        case "FETCH_ALL":
            return action.payload
        case "CREATE":
            return [...posts, action.payload]
        case "UPDATE":
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post))
        default:
            return posts;
    }
}