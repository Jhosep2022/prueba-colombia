import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RolDto } from './dto/rol.dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.rol.findMany();
  }

  async create(data: RolDto) {
    return this.prisma.rol.create({
      data: {
        description: data.description,
        status: data.status,
      },
    });
  }

  async update(id: number, data: RolDto) {
    return this.prisma.rol.update({
      where: { id },
      data: {
        description: data.description,
        status: data.status,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.rol.delete({
      where: { id },
    });
  }
}
