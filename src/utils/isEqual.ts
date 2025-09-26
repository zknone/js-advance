import type { Indexed } from '../types/core';
import { isArrayOrObject } from './checkTypes';

function isEqual(lhs: unknown, rhs: unknown): boolean {
  if (typeof lhs !== typeof rhs) {
    return false;
  }

  if (lhs === rhs) return true;

  if (Array.isArray(lhs) && Array.isArray(rhs)) {
    if (lhs.length !== rhs.length) return false;
    return lhs.every((item, i) => isEqual(item as Indexed, rhs[i] as Indexed));
  }

  if (isArrayOrObject(lhs) && isArrayOrObject(rhs)) {
    return Object.entries(lhs).every(([key, value]) => {
      const rightValue = (rhs as Indexed)[key];

      if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
        return isEqual(value as Indexed, rightValue as Indexed);
      }

      return value === rightValue;
    });
  }

  return false;
}

export default isEqual;
