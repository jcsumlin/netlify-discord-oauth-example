import React, { FunctionComponent } from 'react'
import { Typography } from '@mui/material'
import LoopIcon from '@mui/icons-material/Loop'

interface Props {
  message?: string
}
const Loading: FunctionComponent<Props> = ({ message }) => {
  if (message == null) {
    message = 'Loading...'
  }
  return (
    <span className="grid place-content-center">
      <Typography variant={'h6'}>{message}</Typography>
      <LoopIcon className="animate-spin mx-auto" />
    </span>
  )
}

export default Loading
