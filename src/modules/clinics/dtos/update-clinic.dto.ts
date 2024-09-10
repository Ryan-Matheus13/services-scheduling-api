import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateClinicDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Name of the clinic. Must be a non-empty string.',
    required: false,
  })
  readonly name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Optional phone number of the clinic.',
    required: false,
  })
  readonly phoneNumber?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Optional profile image ID of the clinic.',
    required: false,
  })
  readonly profileImageId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description:
      'Address ID associated with the clinic. Must be a non-empty string.',
    required: false,
  })
  readonly addressId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description:
      'User ID associated with the clinic. Must be a non-empty string.',
    required: false,
  })
  readonly userId?: string;
}
