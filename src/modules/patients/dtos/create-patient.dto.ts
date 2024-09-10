import { IsString, IsOptional, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Name of the patient. Must be a non-empty string.',
  })
  readonly name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description:
      'Optional phone number of the patient. Must be a valid phone number.',
    required: false,
  })
  readonly phoneNumber?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Optional CPF number of the patient.',
    required: false,
  })
  readonly cpfNumber?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Optional profile image ID of the patient.',
    required: false,
  })
  readonly profileImageId?: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Address ID associated with the patient.',
  })
  readonly addressId: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'User ID associated with the patient.',
  })
  readonly userId: string;
}
