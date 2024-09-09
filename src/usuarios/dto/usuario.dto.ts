export class UsuarioDto {
  username?: string;
  password?: string;
  email?: string;
  name?: string;
  rolId?: number;

  constructor(partial: Partial<UsuarioDto>) {
    Object.assign(this, partial);
  }
}
