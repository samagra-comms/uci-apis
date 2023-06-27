import { AddAdminHeaderInterceptor } from './addAdminHeader.interceptor';
import { createMock } from '@golevelup/ts-jest';
import { ConfigService } from '@nestjs/config';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

describe('RequestInterceptor', () => {
  describe('#intercept correct admin token', () => {
    it('t1', async () => {
      const executionContext: ExecutionContext = createMock<ExecutionContext>();
      const config: ConfigService = createMock<ConfigService>();
      const interceptor = new AddAdminHeaderInterceptor(config);

      const adminToken = 'mocked admin-token';
      const headers = {
        'admin-token': adminToken,
      };
      const callHandler: CallHandler = createMock<CallHandler>({
        handle: () =>
          new Observable<string>((observer) => observer.next('next handler')),
      });
      (
        executionContext.switchToHttp().getRequest as jest.Mock<any, any>
      ).mockReturnValueOnce({
        body: {},
        headers,
      });
      (config.get as jest.Mock<any, any>).mockReturnValueOnce(adminToken);
      await interceptor.intercept(executionContext, callHandler);
      expect(callHandler.handle).toBeCalledTimes(1);
      expect(executionContext.switchToHttp().getRequest().body).toEqual({
        isAdmin: true,
      });
    });
  });

  describe('#intercept incorrect admin token', () => {
    it('t2', async () => {
      const executionContext: ExecutionContext = createMock<ExecutionContext>();
      const config: ConfigService = createMock<ConfigService>();
      const interceptor = new AddAdminHeaderInterceptor(config);
      const adminToken = 'mocked admin-token';
      const headers = {
        'admin-token': adminToken,
      };
      const callHandler: CallHandler = createMock<CallHandler>({
        handle: () =>
          new Observable<string>((observer) => observer.next('next handler')),
      });
      (
        executionContext.switchToHttp().getRequest as jest.Mock<any, any>
      ).mockReturnValueOnce({ headers, body: {} });
      (config.get as jest.Mock<any, any>).mockReturnValueOnce(
        'wrong admin token',
      );
      expect(executionContext.switchToHttp()).toBeDefined();
      await interceptor.intercept(executionContext, callHandler);
      expect(callHandler.handle).toBeCalledTimes(1);
      expect(executionContext.switchToHttp().getRequest().body).toEqual({
        isAdmin: false,
      });
    });
  });
});
