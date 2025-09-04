import type { Indexed } from '../types/core';

function merge(lhs: Indexed, rhs: Indexed): Indexed {
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
          [key]: merge((lhsValue as Indexed) || {}, rhsValue as Indexed),
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
