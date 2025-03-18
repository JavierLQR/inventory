import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common'
import { Request } from 'express'

export const GetUserPayloadToken = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>()
    Logger.debug({
      token: request.cookies.auth,
    })
    return request.user
  },
)
