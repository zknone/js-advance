import type { Indexed } from '../types/core';

function cloneDeep<T extends Indexed>(obj: T) {
  function furtherClone(item: T): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {
    if (item === null || typeof item !== 'object') {
      return item;
    }

    if (item instanceof Date) {
      return new Date((item as Date).valueOf());
    }

    if (item instanceof Array) {
      const copy: ReturnType<typeof furtherClone>[] = [];

      item.forEach((_, i) => {
        copy[i] = furtherClone(item[i]);
      });

      return copy;
    }

    if (item instanceof Set) {
      const copy = new Set();

      item.forEach((v) => copy.add(furtherClone(v)));

      return copy;
    }

    if (item instanceof Map) {
      const copy = new Map();

      item.forEach((v, k) => copy.set(k, furtherClone(v)));

      return copy;
    }

    if (item instanceof Object) {
      const copy: Indexed = {};

      Object.getOwnPropertySymbols(item).forEach((s) => {
        copy[s.toString()] = furtherClone(item[s.toString()]);
      });

      Object.keys(item).forEach((k) => {
        copy[k] = furtherClone(item[k]);
      });

      return copy;
    }

    throw new Error(`Unable to copy object: ${item}`);
  }

  return furtherClone(obj);
}

export default cloneDeep;
