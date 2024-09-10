import { ApiProperty } from '@nestjs/swagger';

export class PatientDto {
  @ApiProperty({
    example: 'f0e2f6ef-6b51-4a6a-9794-48c9a8d3e30c',
    description: 'ID do paciente',
  })
  id: string;

  @ApiProperty({
    example: 'Jane Doe',
    description: 'Nome do paciente',
  })
  name: string;

  @ApiProperty({
    example: '12345678900',
    description: 'Número do CPF do paciente',
    required: false,
  })
  cpfNumber?: string;
}
