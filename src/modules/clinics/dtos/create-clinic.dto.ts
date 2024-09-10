import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClinicDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Name of the clinic. Must be a non-empty string.',
  })
  readonly name: string;

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

  @IsString()
  @ApiProperty({
    type: String,
    description:
      'Address ID associated with the clinic. Must be a non-empty string.',
  })
  readonly addressId: string;

  @IsString()
  @ApiProperty({
    type: String,
    description:
      'User ID associated with the clinic. Must be a non-empty string.',
  })
  readonly userId: string;
}
