import { AddResponseObjectInterceptor } from './addResponseObject.interceptor';

describe('RequestInterceptor', () => {
  let interceptor: AddResponseObjectInterceptor;
  beforeAll(() => {
    interceptor = new AddResponseObjectInterceptor();
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });
});
