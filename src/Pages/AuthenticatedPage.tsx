import React, { FunctionComponent } from 'react'
import { Grid, Typography } from '@mui/material'

const AuthenticatedPage: FunctionComponent = () => {
  return (
    <>
      <Grid container spacing={10}>
        <Typography>This page is protected!</Typography>
      </Grid>
    </>
  )
}

export default AuthenticatedPage
