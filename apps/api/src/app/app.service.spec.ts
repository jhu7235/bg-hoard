import { Test } from '@nestjs/testing';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getAllGames', () => {
    it('should return all games', () => {
      expect(service.getAllGames().length).toEqual(3);
    });
  });

  describe('getGame', () => {
    it('should return specified game', () => {
      expect(service.getGame('settlers-in-the-can').id).toEqual(
        'settlers-in-the-ca'
      );
    });
  });
});
