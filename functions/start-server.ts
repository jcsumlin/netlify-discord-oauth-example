import { Handler } from '@netlify/functions'
import AWS from 'aws-sdk'
import {
  StartInstancesRequest
} from 'aws-sdk/clients/ec2'
import middy from '@middy/core'
import middleware from './middleware/auth'
import getEnvironmentVariable from './utils/getEnvironmentVariable'
AWS.config.update({
  credentials: {
    accessKeyId: getEnvironmentVariable('ENV_ACCESS_KEY_ID'),
    secretAccessKey: getEnvironmentVariable('ENV_SECRET_ACCESS_KEY')
  }
})
const ec2 = new AWS.EC2()
interface RequestBody {
  instanceId: string
}

const startServer: Handler = async (event, context) => {
  const body: RequestBody = JSON.parse(event.body as string)
  const params: StartInstancesRequest = { InstanceIds: [body.instanceId] }
  const data = await ec2.startInstances(params).promise()
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}

const handler = middy(startServer)
  .use(middleware())

export { handler }
