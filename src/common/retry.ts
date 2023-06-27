export async function waitFor(millSeconds: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('');
    }, millSeconds);
  });
}

export async function retryPromiseWithDelay(promiseFunc, nthTry: number, delayTime: number) {
  try {
    const res = await promiseFunc();
    return res;
  } catch (e) {
    if (nthTry === 1) {
      return Promise.reject(e);
    }
    console.log('retrying', nthTry, 'time');
    await waitFor(delayTime);
    return retryPromiseWithDelay(promiseFunc, nthTry - 1, delayTime);
  }
}
