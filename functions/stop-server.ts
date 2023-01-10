import { Handler } from '@netlify/functions'
import AWS from 'aws-sdk'
import {
  StartInstancesRequest
} from 'aws-sdk/clients/ec2'
import middy from '@middy/core'
import middleware from './middleware/auth'
const ec2 = new AWS.EC2()
interface RequestBody {
  instanceId: string
}

const stopServer: Handler = async (event, context) => {
  const body: RequestBody = JSON.parse(event.body as string)
  const params: StartInstancesRequest = { InstanceIds: [body.instanceId] }
  const data = await ec2.stopInstances(params).promise()
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}

const handler = middy(stopServer)
  .use(middleware())

export { handler }
