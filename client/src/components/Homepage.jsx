import React, {useState} from 'react'
import {TextField, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {Worker} from "../actions/Worker"

import DeleteIcon from '@material-ui/icons/Delete'

import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

const useStyles = makeStyles((theme) => ({
    submitButton: {
        marginTop: '20px',
        marginBottom: '20px'
    },
    table: {
        maxWidth: '100%',
        scorllY: 'overflow'
    },
    tableCell: {
        wordBreak: "break-all"
    }
}))





const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
    fullUrlText: {
        maxWidth: "100%",
        wordBreak: "break-all"
    },
    shortUrlText: {
        maxWidth: "80%",
        wordBreak: "break-all"
    }
  })










function Link(props) {
    const link = props.link
    const deleteHandler = props.deleteHandler
    const index = props.index
    const [open, setOpen] = React.useState(false)
    const classes = useRowStyles()
  
    return (
        <>
            <TableRow className={classes.root}>
            <TableCell>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell className={classes.shortUrlText} component="th" scope="row">
                {link.shortUrl}
            </TableCell>
            <TableCell align="right"><Button onClick = {(e) => deleteHandler(link._id, index)}><DeleteIcon/></Button></TableCell>
            </TableRow>
            <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Typography className={classes.fullUrlText}>{link.fullUrl}</Typography>
                </Collapse>
            </TableCell>
            </TableRow>
        </>
    )
}


export function Homepage(props) {
    const classes = useStyles()
    const [full, setFull] = useState('')
    const [short, setShort] = useState('')
    const user = props.user
    const setUser = props.setUser
    const [links, setLinks] = useState([])

    const [showLinksButtonDisplay, setShowLinksButtonDisplay] = useState(true)
    const [showLinksTableDisplay, setShowLinksTableDisplay] = useState(false)
    const [password, setPassword] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        const link = {fullUrl: full, shortUrl: short}
        Worker.addLink(link).then(function(response) {
            if (response.type === 0) {
                setFull('')
                setShort('')
                //showLinks()
                const newLinks = [...links, response.data]
                let newUser = user
                newUser.quote -= 1
                setUser(newUser)
                setLinks(newLinks)
                alert("Link Added Successfully")
            }
            else if (response.type === 1) {
                alert("Quote Not Enought.")
            }
            else if (response.type === 2) {
                setFull('')
                alert("Please give a vaild HTTP URL")
            }
            else if (response.type === 3) {
                setShort('')
                alert("The Short URL is not available.")
            }
            else if (response.type === 4) {
                setShort('')
                alert("Only Letters, Digits, Hyphen, and Underscores are acceptable.")
            }
            else if (response.type === -1) {
                alert("Sorry. The Server is currently busy. Please try later!")
            }
        })
    }

    const showLinks = e => {
        Worker.getLinks().then(function(response) {
            if(response.type === 0) {
                setLinks(response.data)
                setShowLinksButtonDisplay(false)
                setShowLinksTableDisplay(true)
            }
            else if(response.type === -1) {
                alert("Sorry. The Server is currently busy. Please try later!")
            }
        })
    }

    const deleteHandler = (id, index) => {
        Worker.deleteLink(id).then(function(response) {
            if(response.type === 0) {
                //showLinks()
                const newLinks = [...links]
                newLinks.splice(index, 1)
                let newUser = user
                newUser.quote += 1
                setUser(newUser)
                setLinks(newLinks)
            }
            else if(response.type === -1) {
                alert("Sorry. The Server is currently busy. Please try later!")
            }
        })
    }

    const changePasswordHandler = e => {
        Worker.changePassword(password).then(function(response) {
            if(response.type == 0) {
                alert("Your Password has been updated successfully.")
                setPassword('')
            }
            else if(response.type == 1) {
                alert("Please give a password between 7 to 16 characters which contain only characters, numeric digits and underscore and first character must be a letter")
                setPassword('')
            }
            else if(response.type === -1) {
                alert("Sorry. The Server is currently busy. Please try later!")
            }
        })
    }

    return(
        <div className = "Main">
        <h2>3030.link</h2>
            <form noValidate autoComplete="off">
                <TextField value={full} onChange = {e => setFull(e.target.value)} id="standard-basic" label="Full URL" fullWidth/>
                <TextField value={short} onChange = {e => setShort(e.target.value)} id="standard-basic" label="Short URL" fullWidth/>
            </form>
            <Button className = {classes.submitButton} variant="contained" onClick = {handleSubmit}>Submit</Button>
            
            <p>Your Quote(s): <strong>{user.quote}</strong></p>

            {showLinksTableDisplay && <TableContainer component={Paper} elevation={3}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableCell />
                        <TableCell>Short URL</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableHead>
                    <TableBody>
                        {links.map((link, index) => (
                            <Link key={link.shortUrl} index = {index} link = {link} deleteHandler = {deleteHandler}/>
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>}

            { showLinksButtonDisplay && <Button className = {classes.showLinksButton} variant="contained" onClick = {showLinks}>Click here to see your links</Button>}

            <p>Change Your Password</p>

            <form noValidate autoComplete="off">
                <TextField value={password} onChange = {e => setPassword(e.target.value)} id="standard-basic" label="new password" type="password" required fullWidth/>
            </form>
            <Button className = {classes.submitButton} variant="contained" onClick = {changePasswordHandler}>Submit</Button>

        </div>
    )
}