import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  VERSION_NEUTRAL,
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ListUserDto } from './dto/list-user.dto'

@Controller({
  path: 'user',
  version: VERSION_NEUTRAL,
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createOrUpdate({
      ...createUserDto,
      name: createUserDto.name.toLowerCase(),
    })
  }

  @Get('list')
  list(@Query() listUserDto: ListUserDto) {
    return this.userService.list(listUserDto)
  }

  @Get('list-all')
  findAll() {
    return this.userService.findAll()
  }

  @Patch('update')
  update(@Body() createUserDto: CreateUserDto) {
    return this.userService.createOrUpdate({
      ...createUserDto,
      name: createUserDto.name.toLowerCase(),
    })
  }
}
