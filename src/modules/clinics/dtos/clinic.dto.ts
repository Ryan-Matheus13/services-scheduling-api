import { ApiProperty } from '@nestjs/swagger';

export class ClinicDto {
  @ApiProperty({
    example: 'f0e2f6ef-6b51-4a6a-9794-48c9a8d3e30c',
    description: 'ID da clínica',
  })
  id: string;

  @ApiProperty({
    example: 'Clínica Exemplar',
    description: 'Nome da clínica',
  })
  name: string;

  @ApiProperty({
    example: '89977776666',
    description: 'Número de telefone da clínica',
    required: false,
  })
  phoneNumber?: string;
}
