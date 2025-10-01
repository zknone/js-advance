function hidden(_target: any, _key: string, descriptor: PropertyDescriptor) {
  return {
    ...descriptor,
    enumerable: false,
  };
}

export default hidden;
