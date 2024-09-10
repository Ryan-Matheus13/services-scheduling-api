import { ApiProperty } from '@nestjs/swagger';

export class DoctorDto {
  @ApiProperty({
    example: 'f0e2f6ef-6b51-4a6a-9794-48c9a8d3e30c',
    description: 'ID do doutor',
  })
  id: string;

  @ApiProperty({
    example: 'Dr. John Doe',
    description: 'Nome completo do doutor',
  })
  fullname: string;

  @ApiProperty({
    example: '1234567890',
    description: 'Número do CRM do doutor',
  })
  crmNumber: string;

  @ApiProperty({
    example: '12345678900',
    description: 'Número do CPF do doutor',
  })
  cpfNumber: string;
}
