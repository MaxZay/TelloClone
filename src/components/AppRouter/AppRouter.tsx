import React from 'react'
import { routes } from '../../utils/routes'
import { Redirect, Route, Switch } from 'react-router'

const AppRouter = () => {
  return (
    <>
      <Switch>
        {routes.map((route) => (
          <Route
            path={route.path}
            component={route.component}
            key={route.path}
            exact={true}
          />
        ))}
        <Redirect to={'/'} />
      </Switch>
    </>
  )
}

export default AppRouter
