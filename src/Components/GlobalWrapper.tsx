import React, { FunctionComponent } from 'react'
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { doLogin, doLogout } from '../utils/api'
import { useAuth } from '@reactivers/hooks'

const GlobalWrapper: FunctionComponent = () => {
  const { isLoggedIn, logout } = useAuth()

  return (
      <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" className={'mb-5'}>
              <Toolbar>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      Site Name
                  </Typography>
                {isLoggedIn
                  ? <Button color="inherit" onClick={() => {
                    doLogout()
                    logout()
                  }}>
                    Logout
                  </Button>
                  : <Button color="inherit" onClick={() => doLogin()}>Login</Button>
                }
              </Toolbar>
          </AppBar>
          <Container maxWidth={'xl'} >
              <Outlet />
          </Container>
      </Box>

  )
}

export default GlobalWrapper
