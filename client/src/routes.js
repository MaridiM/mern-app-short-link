import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { AuthPage, LinksPage, CreatePage, DetailPage } from './pages'

const useRoutes = (isAuthenticated) => {
    if ( isAuthenticated ) {
        return (
            <Switch>
                <Route path='/links' exact>
                    <LinksPage />
                </Route>
                <Route path='/create' exact>
                    <CreatePage />
                </Route>
                <Route path='/detail/:id' exact>
                    <DetailPage />
                </Route>
                <Redirect to='/create' />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path='/' exact>
                <AuthPage />
            </Route>
            <Redirect to='/' />
        </Switch>
    )
}

export default useRoutes