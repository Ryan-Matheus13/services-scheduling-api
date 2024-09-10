import { Module } from '@nestjs/common';
import { SpecialtysService } from './specialtys.service';
import { SpecialtysController } from './specialtys.controller';

@Module({
  providers: [SpecialtysService],
  controllers: [SpecialtysController]
})
export class SpecialtysModule {}
