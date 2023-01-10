import React, { FunctionComponent } from 'react'
import { Container } from '@mui/material'
import { Outlet } from 'react-router-dom'

const GlobalWrapper: FunctionComponent = () => {
  return (
      <Container maxWidth={'xl'}>
        <Outlet />
      </Container>
  )
}

export default GlobalWrapper
