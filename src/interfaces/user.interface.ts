import { ApiProperty } from '@nestjs/swagger';
import { Clinic, Doctor, Patient, UserType } from '@prisma/client';
import { ClinicDto } from 'src/modules/clinics/dtos/clinic.dto';
import { DoctorDto } from 'src/modules/doctors/dtos/doctor.dto';
import { PatientDto } from 'src/modules/patients/dtos/patient.dto';

class UserCreatedResponse {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email do usuário',
  })
  email: string;

  @ApiProperty({
    example: 'PATIENT',
    description: 'Tipo de usuário',
    enum: UserType,
  })
  userType: 'PATIENT' | 'PROFISSIONAL_SAUDE' | 'CLINIC';
}

class UserResponse {
  @ApiProperty({
    example: 'f0e2f6ef-6b51-4a6a-9794-48c9a8d3e30c',
    description: 'ID do usuário',
  })
  id: string;

  @ApiProperty({
    example: new Date().toISOString(),
    description: 'Data de criação do usuário',
  })
  createdAt: Date;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email do usuário',
  })
  email: string;

  @ApiProperty({
    example: 'PATIENT',
    description: 'Tipo de usuário',
    enum: UserType,
  })
  userType: 'PATIENT' | 'PROFISSIONAL_SAUDE' | 'CLINIC';

  @ApiProperty({
    type: () => DoctorDto,
    description: 'Informações do doutor (opcional)',
    required: false,
  })
  doctor?: Doctor;

  @ApiProperty({
    type: () => ClinicDto,
    description: 'Informações da clínica (opcional)',
    required: false,
  })
  clinic?: Clinic;

  @ApiProperty({
    type: () => PatientDto,
    description: 'Informações do paciente (opcional)',
    required: false,
  })
  patient?: Patient;

  @ApiProperty({
    example: new Date().toISOString(),
    description: 'Data de atualização do usuário',
  })
  updatedAt: Date;
}

export { UserCreatedResponse, UserResponse };
