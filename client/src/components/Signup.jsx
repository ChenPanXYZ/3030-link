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

export function Signup() {
    const classes = useStyles()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        const user = {
            username: username,
            password: password
        }
        
        Worker.signup(user).then(function(response) {
            // Type 0 means OK. Type 1 means Username Exists. Type 2 means not valid password
            if (response.type === 0) {
                setUsername('')
                setPassword('')
                window.location.replace("/")
            }
            else if (response.type === 1) {
                alert("Username Already Exists!")
                setUsername('')
            }
            else if (response.type === 2) {
                alert("Please give a password, which contains 7 to 14 letters, digits, or underscores and starts with a letter.")
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
        <h4>Sign Up</h4>
            <form noValidate autoComplete="off">
                <TextField value={username} onChange = {e => setUsername(e.target.value)} id="standard-basic" label="username" required fullWidth/>
                <TextField value={password} onChange = {e => setPassword(e.target.value)} id="standard-basic" label="password" type="password" required fullWidth/>
                <h3>Terms of Service</h3>
                <ol style={{textAlign: "center"}}>
                    <li align="left" textAlign="left">We collect your username and password.</li>
                    <li align="left" textAlign="left">We collect your submitted short and full URLs.</li>
                    <li align="left" textAlign="left">We reserve the right to delete any of the URLs you submitted.</li>
                    <li align="left" textAlign="left">You have 10 quotes.</li>
                </ol>
                <p><strong>You must agree to Terms of Service before you click 'Sign Up'!</strong></p>
                <Button type="submit" className = {classes.submitButton} variant="contained" onClick = {handleSubmit}>I Agree and Sign Up</Button>
            </form>
        </div>
    )
}