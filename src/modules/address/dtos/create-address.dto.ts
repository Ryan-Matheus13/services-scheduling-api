import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Street of the address. Must be a non-empty string.',
  })
  readonly street: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Number of the address. Must be a non-empty string.',
  })
  readonly number: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Optional complement of the address.',
    required: false,
  })
  readonly complement?: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Neighborhood of the address. Must be a non-empty string.',
  })
  readonly neighborhood: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'City of the address. Must be a non-empty string.',
  })
  readonly city: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'State of the address. Must be a non-empty string.',
  })
  readonly state: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'ZIP code of the address. Must be a non-empty string.',
  })
  readonly zipCode: string;
}
