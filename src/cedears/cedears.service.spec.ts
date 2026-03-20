import { Test, TestingModule } from '@nestjs/testing';
import { CedearsService } from './cedears.service';

describe('CedearsService', () => {
  let service: CedearsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CedearsService],
    }).compile();

    service = module.get<CedearsService>(CedearsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
