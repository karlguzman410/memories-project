//How middleware works
//Say a user wants to 'like/update/delete' a post
//User clicks the like button =>
//Check if the user has permissions to 'like/update/delete'. We go to the auth middleWare(NEXT) =>
//Auth middleware confirms or denies that request =>
//if all the conditions below are met/verified, call the next() =>
//like controller



import jwt, { decode } from 'jsonwebtoken'

const auth = async (request, response, next) => {
    try {
        //check for valid token
        const token = request.headers.authorization.split(" ")[1]

        //check for own token or Google Auth token
        //Google Auth token length > 500
        const isCustomAuth = token.length < 500

        //data from the token itself
        let decodedData

        if (token && isCustomAuth) {
            //jwt.verify() gives us data from each specific token
            //username and id
            decodedData = jwt.verify(token, 'test')

            request.userId = decodedData?.id
        } else {
            //else if token is Google Auth
            decodedData = jwt.decode(token)
            //sub -> google's name for a specific google id
            request.userId = decodedData?.sub
        }

        next()
    } catch (error) {
        console.log(error)
    }
}

export default auth