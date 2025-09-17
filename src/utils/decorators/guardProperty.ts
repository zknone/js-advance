function GuardProperty<T extends object>() {
  function propertyDecorator<K extends keyof T>(property: K, errorMessage: string) {
    function methodDecorator(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
      const original = descriptor.value;
      return {
        ...descriptor,
        value(this: T, ...args: any[]) {
          if (!(property in this) || this[property] == null) {
            throw new Error(errorMessage);
          }
          return original.apply(this, args);
        },
      };
    }

    return methodDecorator;
  }
  return propertyDecorator;
}

export default GuardProperty;
