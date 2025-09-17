import type { Indexed } from '../types/core';

function merge<T extends Indexed>(lhs: T, rhs: T): T {
  return Object.keys(rhs).reduce(
    (acc, key) => {
      if (!Object.prototype.hasOwnProperty.call(rhs, key)) {
        return acc;
      }

      const rhsValue = rhs[key];
      const lhsValue = acc[key];

      const isSourceObject =
        typeof rhsValue === 'object' && rhsValue !== null && rhsValue.constructor === Object;

      if (isSourceObject) {
        return {
          ...acc,
          [key]: merge((lhsValue as T) || {}, rhsValue as T),
        };
      }

      return {
        ...acc,
        [key]: rhsValue,
      };
    },
    { ...lhs }
  );
}

export default merge;
