import { retryPromiseWithDelay } from "./retry";

describe('RetryMethod', () => {
  it('should retry an async await method', async () => {
    let callCounter = 0;
    const testFunction = async function createApplication(): Promise<any> {}

    await retryPromiseWithDelay(testFunction, 2, 0);
    await expect(retryPromiseWithDelay(testFunction, 1, 0)).rejects;
  });
});
