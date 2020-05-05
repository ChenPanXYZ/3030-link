import React, {useState, useEffect} from 'react'
import { Route, Switch, BrowserRouter } from "react-router-dom"
import { Redirect } from 'react-router';
import './App.css'
import {Homepage} from "./components/Homepage"
import {Login} from "./components/Login"
import {Signup} from "./components/Signup"
import {Worker} from "./actions/Worker"
import {Helmet} from 'react-helmet'

import Container from '@material-ui/core/Container';



function App() {
  const [user, setUser] = useState()
  const [status, setStatus] = useState(1)
  useEffect(() => {
    Worker.checkLoggedin().then(function(result) {
      setUser(result)
      setStatus(0)
    })
  }, [])


  return (
    <>
      <Helmet>
        <title>3030.link - Custom URL Shortener</title>
        <meta name="description" content="3030.link is a Custom URL Shortener service. It helps you get to your desired URL in an easier way." />
        <link rel="icon" type="image/png" href="favicon.ico" sizes="16x16" />
      </Helmet>
      <Container maxWidth="sm">
        <div className="App">
          <BrowserRouter>
            <Switch>
              {user && status == 0 && <Route exact path='/' render={() => <Homepage user={user} setUser={setUser}></Homepage>} />}
              {!user && status == 0 && <Route exact path='/' render={() => <Login></Login>} />}
              <Route exact path='/Signup' render={() => (user ? <Redirect to="/" /> : <Signup></Signup>)} />
            </Switch>
          </BrowserRouter>
        </div>
      </Container>
    </>
  );
}

export default App
