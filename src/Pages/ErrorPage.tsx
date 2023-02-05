import React, { FunctionComponent } from 'react'
import { Button } from '@mui/material'

interface Props {
  message?: string
}
const ErrorPage: FunctionComponent<Props> = ({ message }: Props) => {
  if (message == null) {
    message = 'Sorry, an unexpected error has occurred.'
  }
  return (
        <div className="grid place-content-center text-center">
            <h1>Oops!</h1>
            <p>{message}</p>
            <Button variant={'contained'} href={'/'}>Go Home</Button>
        </div>
  )
}

export default ErrorPage
