import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolDto } from './dto/rol.dto';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { RolesGuard } from './guard/roles.guard';
import { Roles } from './decorators/roles.decorator';

@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @Roles(2, 3)
  async findAll() {
    const roles = await this.rolesService.findAll();
    return new ResponseDto('success', 'Roles retrieved successfully', roles);
  }

  @Post()
  @Roles(2)
  async create(@Body() createRoleDto: RolDto) {
    const role = await this.rolesService.create(createRoleDto);
    return new ResponseDto('success', 'Role created successfully', role);
  }

  @Put(':id')
  @Roles(2)
  async update(@Param('id') id: number, @Body() updateRoleDto: RolDto) {
    const role = await this.rolesService.update(+id, updateRoleDto);
    return new ResponseDto('success', 'Role updated successfully', role);
  }

  @Delete(':id')
  @Roles(2)
  async delete(@Param('id') id: number) {
    await this.rolesService.delete(+id);
    return new ResponseDto('success', 'Role deleted successfully');
  }
}
