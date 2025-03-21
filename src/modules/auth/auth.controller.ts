import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateAuthDto } from './dto/create-auth.dto'
import { Response } from 'express'
import { AuthUserGuard } from './guards/auth.guard'

@Controller('auth')
export class AuthController {
  private readonly logger: Logger = new Logger(AuthController.name)
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() data: CreateAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const auth = await this.authService.signIn(data)
    const isProduction = process.env.NODE_ENV === 'production'
    if (isProduction) {
      this.logger.debug("Autenticando en modo: '" + process.env.NODE_ENV + "'")
      // // PRO
      res.cookie('auth', auth, {
        // si pones en true, una vez actualizada la pagina en el front
        // se pierde las cookies sale undefined
        // sameSite: isProduction ? 'none' : 'lax', // SameSite=None solo para producción
        sameSite: 'none', // SameSite=None solo para producción
        // secure: isProduction, // Secure=true solo en producción (HTTPS)
        secure: true, // Secure=true solo en producción (HTTPS)
        httpOnly: true,
      })
      return res.send({
        auth,
        statusCode: HttpStatus.OK,
        message: 'Autenticación exitosa',
      })
    }
    this.logger.debug("Autenticando en modo: '" + process.env.NODE_ENV + "'")
    res.cookie('auth', auth, {
      sameSite: 'lax',
      secure: true,
      httpOnly: true,
    })
    res.send({
      auth,
      statusCode: HttpStatus.OK,
      message: 'Autenticación exitosa',
    })
  }

  @UseGuards(AuthUserGuard)
  @Get('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    try {
      res.cookie('auth', '', {
        sameSite: 'lax',
        secure: true,
        httpOnly: true,
      })

      res.send({
        statusCode: HttpStatus.OK,
        success: true,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Error logging out' })
    }
  }
}
