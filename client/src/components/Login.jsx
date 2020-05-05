import React, {useState} from 'react'
import {TextField, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {Worker} from "../actions/Worker"

const useStyles = makeStyles((theme) => ({
    submitButton: {
        marginTop: '20px',
        marginBottom: '20px'
    },
}))

export function Login() {
    const classes = useStyles()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        const user = {
            username: username,
            password: password
        }
        
        Worker.login(user).then(function(response) {
            // type 1 means username doesn't exits, type 2 means password doesn't match.
            if (response.type === 0) {
                setUsername('')
                setPassword('')
                window.location.replace("/")
            }
            else if (response.type === 1) {
                alert("Username doesn't exist.")
                setUsername('')
            }
            else if (response.type === 2) {
                alert("Username and Password doesn't match.")
                setPassword('')
            }
            else if (response.type === -1){
                alert("Sorry. The Server is currently busy. Please try later!")
            }
        })
    }

    return(
        <div className = "Main">
        <h2>3030.link</h2>
        <h4>Login</h4>
            <form noValidate autoComplete="off">
                <TextField value={username} onChange = {e => setUsername(e.target.value)} id="standard-basic" label="username" required fullWidth/>
                <TextField value={password} onChange = {e => setPassword(e.target.value)} id="standard-basic" label="password" type="password" required fullWidth/>
            </form>
            <Button className = {classes.submitButton} variant="contained" onClick = {handleSubmit}>Login</Button>
            <p>Don't have an account? <a href="/signup">Join now</a>.</p>
        </div>
    )
}