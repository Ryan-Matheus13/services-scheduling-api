import { Test, TestingModule } from '@nestjs/testing';
import { SpecialtysController } from './specialtys.controller';

describe('SpecialtysController', () => {
  let controller: SpecialtysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecialtysController],
    }).compile();

    controller = module.get<SpecialtysController>(SpecialtysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
