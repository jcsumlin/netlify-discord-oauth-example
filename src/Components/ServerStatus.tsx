import React, { FunctionComponent, ReactNode } from 'react'
import { InstanceStateName } from 'aws-sdk/clients/ec2'
import { Card, CardActions, CardContent, CardMedia, Chip, Typography } from '@mui/material'
import { upperFirst } from 'lodash'
import { startServer } from '../utils/api'
import LoadingButton from '@mui/lab/LoadingButton'

interface OwnProps {
  instanceId: string
  gameName: string
  serverStatus: InstanceStateName
  publicIp: string
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
      case 'pending':
        color = 'warning'
        break
      default:
        color = 'default'
    }
    return <Chip label={upperFirst(status)} color={color} className={'my-3'} />
  }

  const startGameServer = (id: string): void => {
    startServer(id)
      .then(() => setLoading(true))
      .catch(console.error)
  }
  const loadingStatuses = ['pending', 'stopping', 'shutting-down']

  return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
            sx={{ height: 140 }}
            image={getGameIcon(props.gameName)}
            title={props.gameName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.gameName}
          </Typography>
          {getStatus(props.serverStatus)}
          <Chip label={props.publicIp}/>
        </CardContent>
        <CardActions>
          <LoadingButton
              variant={'contained'}
              color="success"
              disabled={props.serverStatus === 'running'}
              onClick={() => startGameServer(props.instanceId)}
              loading={loadingStatuses.includes(props.serverStatus) || loading}
              classes={'!mb-3'}
          >
            Start Server
          </LoadingButton>
        </CardActions>
      </Card>
  )
}

export default ServerStatus
