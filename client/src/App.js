import React, { useEffect, useCallback, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import 'materialize-css'

import useRouter from './routes'
import { useAuth } from './hooks'
import { AuthContext } from './context/'
import { Navbar, Loader } from './components'
import { useHttp } from './hooks'
 

function App() {
  const { token, login, logout, userId, ready } = useAuth()

  const { request } = useHttp()
  const [ isAuthenticated, setAuthenticated ] = useState(false)
  
  const verifyHandler = useCallback (async (token) => {
      try {
          await request('/api/auth/verify',  "POST", null, {Authorization: `Bearer ${token}`})
        } catch (error) {
          logout()         
      }
    },[request, logout ])

  useEffect(() => {
    verifyHandler(token)
    setAuthenticated(!!token)
  }, [verifyHandler, token])
  
  const routes = useRouter(isAuthenticated) // Custom hook in ./routes


  if ( !ready ) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, userId, isAuthenticated }}>
      <Router>
        { isAuthenticated && <Navbar />}
        <div className="container">
            { routes }
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
