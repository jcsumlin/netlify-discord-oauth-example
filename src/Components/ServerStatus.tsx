import React, { FunctionComponent, ReactNode } from 'react'
import { InstanceStateName } from 'aws-sdk/clients/ec2'
import { Button, Chip, Paper } from '@mui/material'
import { upperFirst } from 'lodash'
import { startServer } from '../utils/api'

interface OwnProps {
  instanceId: string
  gameName: string
  serverStatus: InstanceStateName
}

type Props = OwnProps

const ServerStatus: FunctionComponent<Props> = (props) => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const getGameIcon = (game: string): string => {
    switch (game) {
      case 'Rust Server':
        return 'https://cdn.cloudflare.steamstatic.com/steam/apps/252490/header.jpg'
      case 'Minecraft':
        return 'http://getdrawings.com/free-icon/minecraft-launcher-icon-69.png'
      case 'GMOD TTT':
        return 'https://cdn.cloudflare.steamstatic.com/steam/apps/4000/header.jpg?t=1663621793'
      default:
        return 'none'
    }
  }

  const getStatus = (status: InstanceStateName): ReactNode => {
    let color: 'success' | 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'warning' | undefined
    switch (status) {
      case 'running':
        color = 'success'
        break
      case 'stopped':
        color = 'error'
        break
      case 'stopping':
        color = 'warning'
        break
      default:
        color = 'default'
    }
    return <Chip label={upperFirst(status)} color={color} />
  }

  const startGameServer = (id: string): void => {
    startServer(id)
      .then(() => setLoading(true))
      .catch(console.error)
  }
  return (
    <Paper elevation={3} className={'block'}>
        <img src={getGameIcon(props.gameName)} width={250} />
        <h1>{props.gameName}</h1>
        {getStatus(props.serverStatus)}
        <Button
            variant={'contained'}
            onClick={() => startGameServer(props.instanceId)}
            disabled={props.serverStatus === 'running' || loading}>
          Start Server
        </Button>
    </Paper>
  )
}

export default ServerStatus
