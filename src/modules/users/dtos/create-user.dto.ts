import { IsString, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { UserType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  readonly email: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  readonly password: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  readonly userType: 'PATIENT' | 'PROFISSIONAL_SAUDE' | 'CLINIC';
}
