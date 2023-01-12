import React, { FunctionComponent, useEffect } from 'react'
import { getServers } from '../utils/api'
import ServerStatus from '../Components/ServerStatus'
import { ServerStatusResponse } from '../Types/types'
import { Grid } from '@mui/material'
import { redirect } from 'react-router-dom'

const AuthenticatedPage: FunctionComponent = () => {
  const [servers, setServers] = React.useState<ServerStatusResponse>()
  useEffect(() => {
    getServers()
      .then((res) => setServers(res.data))
      .catch(() => redirect('/'))
  }, [])

  return (
    <>
      <Grid container spacing={10}>
        {(servers != null)
          ? servers.gameServers.map(server => {
            return <Grid item lg={4} key={server.gameName}>
            <ServerStatus
                gameName={server.gameName}
                serverStatus={server.status}
                instanceId={server.instanceId}
                publicIp={server.publicIp}
            />
          </Grid>
          })
          : null}

      </Grid>
    </>
  )
}

export default AuthenticatedPage
