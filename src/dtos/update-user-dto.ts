// DTO para atualização de usuário
import { IsEmail, IsOptional, Length } from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @Length(6, 128)
  password?: string;
}
