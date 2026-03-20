import { Test, TestingModule } from '@nestjs/testing';
import { CedearsController } from './cedears.controller';
import { CedearsService } from './cedears.service';

describe('CedearsController', () => {
  let controller: CedearsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CedearsController],
      providers: [CedearsService],
    }).compile();

    controller = module.get<CedearsController>(CedearsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
