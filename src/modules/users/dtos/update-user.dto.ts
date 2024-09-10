import { IsString, IsOptional, IsEmail, IsEnum } from 'class-validator';
import { UserType } from '@prisma/client'; // Importa o enum UserType

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsEnum(UserType)
  @IsOptional()
  readonly userType?: UserType;
}
