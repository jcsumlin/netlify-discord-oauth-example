import { builder, Handler } from '@netlify/functions'
import AWS from 'aws-sdk'
import {
  DescribeInstanceStatusRequest,
  DescribeInstancesResult,
  InstanceId,
  InstanceType,
  InstanceStateName
} from 'aws-sdk/clients/ec2'
import middy from '@middy/core'
import middleware from './middleware/auth'
const ec2 = new AWS.EC2()
interface GameServerStatus {
  instanceId: InstanceId
  status: InstanceStateName
  instanceType: InstanceType
  gameName: string
  publicIp: string
}
const myHandler: Handler = async () => {
  const gameServers: GameServerStatus[] = []
  const params: DescribeInstanceStatusRequest = {
    InstanceIds: ['i-0d38b2393e703a0e5', 'i-0009b47703519709d', 'i-05c313a670f5ec822']
  }
  const data: DescribeInstancesResult = await ec2.describeInstances(params).promise()
  if (data.Reservations != null) {
    data.Reservations.forEach(({ Instances }) => {
      if (Instances != null) {
        const { State, InstanceType, Tags, InstanceId, PublicIpAddress } = Instances[0]
        const gameName = Tags?.filter(tag => tag.Key === 'Name')[0]
        const server: GameServerStatus = {
          instanceId: InstanceId ?? '',
          gameName: gameName?.Value ?? 'Unknown Game',
          instanceType: InstanceType ?? '',
          status: State?.Name ?? '',
          publicIp: PublicIpAddress ?? ''
        }
        gameServers.push(server)
      }
    })
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ gameServers })
  }
}

const handler = middy(builder(myHandler))
  .use(middleware())

export { handler }
