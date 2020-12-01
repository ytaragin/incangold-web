import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import GameList from '../Game/GameList'
import GameLoadingState from '../Game/GameLoadingState'

const routes = (
  <div>
    <Link to="/">Game List</Link>
    <Switch>
      <Route exact path="/" component={GameList} />
      <Route path="/game/:gameId" component={GameLoadingState} />
    </Switch>
  </div>
)

export default routes