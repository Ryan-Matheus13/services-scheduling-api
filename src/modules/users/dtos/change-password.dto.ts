import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class ChangePasswordDto {
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
  readonly confirmPassword: string;
}
