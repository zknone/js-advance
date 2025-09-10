import type { Indexed } from '../types/core';
import merge from './merge';

function set<T extends Indexed>(object: T | unknown, path: string, value: unknown): T {
  if (typeof object !== 'object' || object === null) {
    return object as T;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any
  );

  return merge<T>(object as T, result);
}

export default set;
