import { makeStyles } from '@material-ui/core/styles'
import shadows from '@material-ui/core/styles/shadows'

export default makeStyles(() => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(178, 192, 180, 0.5)'
    },
    heading: {
        color: 'rgba(126, 184, 135, 1)'
    },
    image: {
        marginLeft: '15px',
        height: "100px",
    },
}))