export async function callAsyncWithRetry<
  T extends (...args: any[]) => Promise<any>,
>(cb: T, retries = 3): Promise<Awaited<ReturnType<T>> | void> {
  for (let i = 0; i < retries; i++) {
    try {
      return await cb();
    } catch (err) {
      if (i === retries - 1) {
        throw err;
      }
      throw err;
    }
  }
}
