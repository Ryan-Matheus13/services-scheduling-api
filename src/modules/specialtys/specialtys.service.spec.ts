import { Test, TestingModule } from '@nestjs/testing';
import { SpecialtysService } from './specialtys.service';

describe('SpecialtysService', () => {
  let service: SpecialtysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecialtysService],
    }).compile();

    service = module.get<SpecialtysService>(SpecialtysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
