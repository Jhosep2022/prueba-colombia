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
import { UsuariosService } from './usuarios.service';
import { UsuarioDto } from './dto/usuario.dto';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { RolesGuard } from 'src/roles/guard/roles.guard';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(2, 3)
  @Get()
  async findAll() {
    const users = await this.usuariosService.findAll();
    return new ResponseDto('success', 'Usuarios retrieved successfully', users);
  }

  @Post()
  async create(@Body() createUsuarioDto: UsuarioDto) {
    const user = await this.usuariosService.create(createUsuarioDto);
    return new ResponseDto('success', 'Usuario created successfully', user);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(3)
  async update(@Param('id') id: number, @Body() updateUsuarioDto: UsuarioDto) {
    const user = await this.usuariosService.update(+id, updateUsuarioDto);
    return new ResponseDto('success', 'Usuario updated successfully', user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(2)
  async delete(@Param('id') id: number) {
    await this.usuariosService.delete(+id);
    return new ResponseDto('success', 'Usuario deleted successfully');
  }
}
