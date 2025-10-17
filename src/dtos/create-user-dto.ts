// DTO para criação de usuário (validação com class-validator)
import { IsEmail, IsNotEmpty, Length, IsOptional } from 'class-validator';

export class CreateUserDTO {
  @IsOptional()            // nome é opcional
  name?: string;

  @IsEmail()               // email deve ser válido
  email: string;

  @IsNotEmpty()
  @Length(6, 128)          // senha mínima 6 chars
  password: string;
}
