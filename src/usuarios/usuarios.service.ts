import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsuarioDto } from './dto/usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.usuario.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        rol: {
          select: {
            id: true,
            description: true,
          },
        },
      },
    });
  }

  async findByUsername(username: string): Promise<any> {
    return this.prisma.usuario.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        password: true,
        rol: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  async create(data: UsuarioDto) {
    this.validateRequiredFields(data);

    const hashedPassword = await this.hashPassword(data.password);

    return this.prisma.usuario.create({
      data: {
        username: data.username,
        password: hashedPassword,
        email: data.email,
        name: data.name,
        rol: { connect: { id: data.rolId } },
      },
    });
  }

  async update(id: number, data: UsuarioDto) {
    if (!data.username && !data.email && !data.rolId) {
      throw new BadRequestException(
        'At least one field (username, email, or rolId) is required for update',
      );
    }
    const { rolId, ...updatedData } = data;
    if (data.password) {
      updatedData.password = await this.hashPassword(data.password);
    }
    return this.prisma.usuario.update({
      where: { id },
      data: {
        ...updatedData,
        rol: rolId ? { connect: { id: rolId } } : undefined,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.usuario.delete({
      where: { id },
    });
  }

  private validateRequiredFields(data: UsuarioDto) {
    if (!data.username || !data.password || !data.email || !data.rolId) {
      throw new BadRequestException(
        'Missing required fields: username, password, email, rolId',
      );
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
