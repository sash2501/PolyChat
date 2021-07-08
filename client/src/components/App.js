import React from "react"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { AuthProvider } from "../contexts/AuthContext"

import Teams from "./Teams/Teams";
import Join from "./Join/Join";
import Call from "./Session/Call/Call"

function App() {
  return (
    <div style={{ fontFamily: 'Avenir' }}>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/call" component={Call} />
            <Route path="/teams" component={Teams} />
            <Route path="/" component={Join} /> 
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App;
