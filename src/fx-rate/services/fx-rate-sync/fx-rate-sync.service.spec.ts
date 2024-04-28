import { Test, TestingModule } from '@nestjs/testing';
import { FxRateSyncService } from './fx-rate-sync.service';

describe('FxRateSyncService', () => {
  let service: FxRateSyncService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FxRateSyncService],
    }).compile();

    service = module.get<FxRateSyncService>(FxRateSyncService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
