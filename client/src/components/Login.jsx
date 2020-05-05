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
                <Button type="submit" className = {classes.submitButton} variant="contained" onClick = {handleSubmit}>Login</Button>
            </form>
            <p>Don't have an account? <a href="/signup">Join now</a>.</p>

            <ol style={{textAlign: "center", wordBreak: "break-all"}}>
                <li align="left" textAlign="left">3030.link is a URL Shortener Service.</li>
                <li align="left" textAlign="left">You can set up 10 <strong>custom</strong> short url for your favourite links</li>
                <li align="left" textAlign="left">For example, you can set <strong>music</strong> for <strong>https://www.youtube.com/watch?v=Y-JQ-RCyPpQ&t=13647s</strong>, so you just need to enter <strong><a href="/music">3030.link/music</a></strong> to enjoy your study music.</li>
            </ol>
        </div>
    )
}