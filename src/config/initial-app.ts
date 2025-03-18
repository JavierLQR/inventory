import { INestApplication, Logger, ValidationPipe } from '@nestjs/common'
import * as cookie from 'cookie-parser'
export const InitialApp = async (app: INestApplication<any>) => {
  Logger.debug('Initial Cookie Parser')
  app.use(cookie())
  Logger.debug('Cookie Parser Initialized')

  console.log({
    data: process.env.TEST,
  })

  app.useLogger(
    process.env.NODE_ENV === 'production'
      ? ['error', 'warn', 'log']
      : ['log', 'error', 'warn', 'debug', 'verbose'],
  )
  Logger.debug(
    "Configuration enable cors with origin 'true' and credentials 'true' .....",
  )
  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  })
  Logger.debug('Enable cors Initialized !!!')
  app.setGlobalPrefix('api-v1')

  const PORT = Number(process.env.PORT) ?? 3000
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  await app.listen(PORT, () => {
    if (process.env.NODE_ENV === 'development')
      return Logger.verbose(
        `Listening on port ${PORT}, in development mode: ${process.env.NODE_ENV}`,
      )
    Logger.log(
      `Listening on port ${PORT}, in production mode: ${process.env.NODE_ENV}`,
    )
  })
}
