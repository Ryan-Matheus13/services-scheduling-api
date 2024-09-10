import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { PrismaService } from './database/prisma.service';
import { AuthModule } from './modules/auth/modules/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './database/prisma.module';
import { UserModule } from './modules/users/user.module';
import { PasswordModule } from './modules/auth/modules/password.module';
import { DoctorsModule } from './modules/doctors/doctors.module';
import { PatientsModule } from './modules/patients/patients.module';
import { ClinicsModule } from './modules/clinics/clinics.module';
import { ServicesModule } from './modules/services/services.module';
import { SchedulingModule } from './modules/scheduling/scheduling.module';
import { AddressModule } from './modules/address/address.module';
import { SlotsModule } from './modules/slots/slots.module';
import { ImagesModule } from './modules/images/images.module';
import { SpecialtysModule } from './modules/specialtys/specialtys.module';
import { ErrorInterceptor } from './modules/auth/interceptors/error.interceptor';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PasswordModule,
    DoctorsModule,
    PatientsModule,
    ClinicsModule,
    ServicesModule,
    SchedulingModule,
    AddressModule,
    SlotsModule,
    ImagesModule,
    SpecialtysModule,
    ConfigModule.forRoot(),
  ],
  providers: [
    PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
  ],
  exports: [PrismaService],
})
export class AppModule {}
