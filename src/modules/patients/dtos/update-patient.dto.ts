import { IsString, IsOptional, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePatientDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Name of the patient. Must be a non-empty string.',
    required: false,
  })
  readonly name?: string;

  @IsOptional()
  @IsPhoneNumber(null, { message: 'Phone number must be a valid phone number' })
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

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Address ID associated with the patient.',
    required: false,
  })
  readonly addressId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'User ID associated with the patient.',
    required: false,
  })
  readonly userId?: string;
}
