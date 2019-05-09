import { AppLoadModule } from './app-loader.module';

describe('AppLoaderModule', () => {
  let appLoaderModule: AppLoadModule;

  beforeEach(() => {
    appLoaderModule = new AppLoadModule();
  });

  it('should create an instance', () => {
    expect(appLoaderModule).toBeTruthy();
  });
});
