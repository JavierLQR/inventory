import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateAuthDto } from './dto/create-auth.dto'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(
    @Body() data: CreateAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const auth = await this.authService.signIn(data)
    const isProduction = process.env.NODE_ENV === 'production'
    if (isProduction)
      // // PRO
      return res.cookie('auth', auth, {
        // si pones en true, una vez actualizada la pagina en el front
        // se pierde las cookies sale undefined
        // sameSite: isProduction ? 'none' : 'lax', // SameSite=None solo para producción
        sameSite: 'none', // SameSite=None solo para producción
        // secure: isProduction, // Secure=true solo en producción (HTTPS)
        secure: true, // Secure=true solo en producción (HTTPS)
        httpOnly: true,
      })

    res.cookie('auth', auth, {
      sameSite: 'lax',
      secure: true,
      httpOnly: true,
    })

    res.send({ auth, statusCode: HttpStatus.OK })
  }

  @Get('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    try {
      res.cookie('auth', '', {
        sameSite: 'lax',
        secure: true,
        httpOnly: true,
        // path: '/',
      })

      res.send({
        auth: '',
        statusCode: HttpStatus.OK,
        success: true,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Error logging out' })
    }
  }
}
