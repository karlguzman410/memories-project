import { makeStyles } from '@material-ui/core/styles'
import shadows from '@material-ui/core/styles/shadows'

export default makeStyles((theme) => ({
    [theme.breakpoints.down('sm')]: {
        mainContainer: {
            flexDirection: "column-reverse"
        }
    },

}))