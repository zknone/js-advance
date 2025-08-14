import type Block from '../core/block/Block';

export type EventsMap = Record<string, EventListenerOrEventListenerObject>;

export type AdditionalField = Record<string, unknown>;

export type BlockBasics<T> = T & {
  events?: EventsMap;
  settings?: {
    withInternalID: boolean;
  };
  children?: Block<BlockBasics<AdditionalField>>[];
  __id?: string;
};

export type Meta<T> = { tagName: string; tagClassName: string; props: T } | null;
