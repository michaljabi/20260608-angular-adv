import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    // Compiling the module exercises Nest DI end-to-end: it only resolves
    // AppController's `AppService` dependency if SWC emitted decorator metadata.
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  it('getData returns the greeting', () => {
    const controller = app.get<AppController>(AppController);
    expect(controller.getData()).toEqual({ message: 'Hello API' });
  });
});
