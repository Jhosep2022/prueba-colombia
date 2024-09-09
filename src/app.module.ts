import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { RolesModule } from './roles/roles.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, RolesModule, UsuariosModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
