function GuardMethodResult<T extends object>() {
  function propertyDecorator<K extends keyof T>(methodName: K, errorMessage: string) {
    function methodResultDecorator(
      _target: any,
      _propertyKey: string,
      descriptor: PropertyDescriptor
    ): PropertyDescriptor {
      const original = descriptor.value;

      function wrappedMethod(this: T, ...args: any[]) {
        const method = this[methodName];

        if (typeof method !== 'function') {
          throw new Error(`${String(methodName)} is not a function`);
        }

        const fn = method as (...args: any[]) => unknown;
        const result = fn.apply(this);

        if (!result) {
          throw new Error(errorMessage);
        }

        return original.apply(this, [result, ...args]);
      }

      return {
        ...descriptor,
        value: wrappedMethod,
      };
    }
    return methodResultDecorator;
  }

  return propertyDecorator;
}

export default GuardMethodResult;
