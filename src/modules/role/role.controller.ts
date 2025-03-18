import { Controller, Get, Post, Body, VERSION_NEUTRAL } from '@nestjs/common'
import { RoleService } from './role.service'
import { CreateRoleDto } from './dto/create-role.dto'

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

  @Get()
  findAll() {
    return this.roleService.findAll()
  }
}
