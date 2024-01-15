import { Test, TestingModule } from '@nestjs/testing';
import { WoozService } from './wooz.service';

describe('WoozService', () => {
  let service: WoozService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WoozService],
    }).compile();

    service = module.get<WoozService>(WoozService);
  });

  it('Should return random 4 digit of A-Z a-z 0-9 string', () => {
    expect(service.generateFourLetter()).toHaveLength(4);
  });
});
