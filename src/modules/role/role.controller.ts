import {
  Controller,
  Get,
  Post,
  Body,
  VERSION_NEUTRAL,
  UseGuards,
} from '@nestjs/common'
import { RoleService } from './role.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { AuthUserGuard } from '../auth/guards/auth.guard'

@Controller({
  path: 'roles',
  version: VERSION_NEUTRAL,
})
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto)
  }
  @UseGuards(AuthUserGuard)
  @Get()
  findAll() {
    return this.roleService.findAll()
  }
}
