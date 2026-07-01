import { Test, TestingModule } from '@nestjs/testing';
import { HelthController } from './health.controller';

describe('HelthController', () => {
  let controller: HelthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HelthController],
    }).compile();

    controller = module.get<HelthController>(HelthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
