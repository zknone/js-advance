import type Block from '../core/block/Block';
import type { EventMap } from './chat';

export type AdditionalField = Record<string, unknown>;

export type BlockBasics<T> = T & {
  events?: EventMap;
  settings?: {
    withInternalID: boolean;
  };
  children?: Block<BlockBasics<AdditionalField>>[];
  __id?: string;
};

export interface Meta<T> {
  tagName: string;
  tagClassName: string;
  props: T;
}
