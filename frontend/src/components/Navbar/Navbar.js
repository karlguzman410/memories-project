import React, { useState, useEffect } from 'react'
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core'
import useStyles from './styles'
import memories from '../../images/memories.png'
import { Link } from 'react-router-dom'


const Navbar = () => {
    const classes = useStyles()

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    console.log(user)

    useEffect(() => {
        const token = user?.token
        //JWT.. for manual signup
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [user])

    return (
        <AppBar position="static" color="inherit" className={classes.appBar}>
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" variant="h2" className={classes.heading}>Memories</Typography>
                <img src={memories} alt="memories" className={classes.image} height="60" />
            </div>
            <Toolbar className={classes.Toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary">Logout</Button>
                    </div>
                ) : (
                        <Button component={Link} to="/auth" variant="contained" color="primary"> Sign In</Button>
                    )}
            </Toolbar>

        </AppBar>
    )
}

export default Navbar
