import { Test, TestingModule } from '@nestjs/testing';
import { HelthService } from './health.service';

describe('HelthService', () => {
  let service: HelthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelthService],
    }).compile();

    service = module.get<HelthService>(HelthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
