import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import Board from '../Game/Board'
import GameState from '../Game/GameState'

const routes = (
  <div>
    Hello Routes  
    <Link to="/">Home</Link>
    <Link to="/game">Game</Link>
    <Switch>
      <Route exact path="/" component={Board} />
      <Route path="/game" component={GameState} />
    </Switch>
  </div>
)

export default routes