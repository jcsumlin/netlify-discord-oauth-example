import parseCookie from '../utils/parseCookie'
import { verifyAndDecode } from '../utils/jwt'
import allowedUsers from '../allowed_users.json'
import middy from '@middy/core'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { BuilderResponse } from '@netlify/functions/dist/function/response'

const middleware = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
    request
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  ): Promise<BuilderResponse | void> => {
    // Your middleware logic
    const { event } = request
    if (event.headers.cookie == null) {
      throw new Error('Missing auth tokens')
    }
    try {
      const cookies = parseCookie(event.headers.cookie)
      const { userId } = verifyAndDecode(cookies.DiscordAuth)
      console.log('userId', userId)

      if (userId != null) {
        if (!allowedUsers.user_ids.includes(userId)) {
          return {
            statusCode: 401,
            body: JSON.stringify({ error: 'Not authorized, this user isn\'t authorized' })
          }
        }
      } else {
        return {
          statusCode: 401,
          body: JSON.stringify({ error: 'Not authorized, cant read user' })
        }
      }
    } catch (e) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Not authorized, cant read cookie' })
      }
    }
  }

  const after: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
    request
  ): Promise<void> => {
    // Your middleware logic
  }

  return {
    before,
    after
  }
}

export default middleware
