import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import GameList from '../Game/GameList'
import GameLoadingState from '../Game/GameLoadingState'
import JoinGame from '../Game/JoinGame'

const routes = (
  <div>
    <Link to="/">Game List</Link>
    <Switch>
      <Route exact path="/" component={GameList} />
      <Route path="/game/:gameId" component={GameLoadingState} />
      <Route path="/join/:gameId" component={JoinGame} />
    </Switch>
  </div>
)

export default routes