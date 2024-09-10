import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAddressDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Street of the address. Must be a non-empty string.',
    required: false,
  })
  readonly street?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Number of the address. Must be a non-empty string.',
    required: false,
  })
  readonly number?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Optional complement of the address.',
    required: false,
  })
  readonly complement?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Neighborhood of the address. Must be a non-empty string.',
    required: false,
  })
  readonly neighborhood?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'City of the address. Must be a non-empty string.',
    required: false,
  })
  readonly city?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'State of the address. Must be a non-empty string.',
    required: false,
  })
  readonly state?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'ZIP code of the address. Must be a non-empty string.',
    required: false,
  })
  readonly zipCode?: string;
}
