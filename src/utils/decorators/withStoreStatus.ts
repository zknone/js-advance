import store from '../../core/store/store';

function withStoreStatus(errorMessage: string, go?: () => void) {
  return function wrapMethods<T extends (...args: any[]) => Promise<any>>(
    _target: unknown,
    _propertyKey: string,
    descriptor: TypedPropertyDescriptor<T>
  ): TypedPropertyDescriptor<T> {
    const originalMethod = descriptor.value!;

    async function wrappedMethod(
      this: any,
      ...args: Parameters<T>
    ): Promise<Awaited<ReturnType<T>>> {
      store.set('auth.loading', true);
      store.set('auth.error', null);

      try {
        const result = await originalMethod.apply(this, args);
        if (go) {
          go();
        }
        return result as Awaited<ReturnType<T>>;
      } catch (error) {
        store.set('auth.error', errorMessage);
        throw error;
      } finally {
        store.set('auth.loading', false);
      }
    }

    const nextDescriptor: TypedPropertyDescriptor<T> = {
      ...descriptor,
      value: wrappedMethod as T,
    };

    return nextDescriptor;
  };
}
export default withStoreStatus;
