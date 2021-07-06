import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getAllGames', () => {
    it('should return 3 games', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getAllGames().length).toEqual(3);
    });
  });

  describe('getGame', () => {
    it('should return 3 games', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getGame('settlers-in-the-can').id).toEqual(
        'settlers-in-the-can'
      );
    });
  });
});
