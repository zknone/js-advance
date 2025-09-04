import type { Indexed } from '../types/core';
import { isArrayOrObject } from './checkTypes';

function isEqual(lhs: Indexed, rhs: Indexed): boolean {
  if (lhs === rhs) return true;

  if (Array.isArray(lhs) && Array.isArray(rhs)) {
    if (lhs.length !== rhs.length) return false;
    return lhs.every((item, i) => isEqual(item as Indexed, rhs[i] as Indexed));
  }

  return Object.entries(lhs).every(([key, value]) => {
    const rightValue = rhs[key];

    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      return isEqual(value as Indexed, rightValue as Indexed);
    }

    return value === rightValue;
  });
}

export default isEqual;
