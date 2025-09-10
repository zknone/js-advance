import type { ILoggedUser } from '../core/api/interfaces';
import type { AdditionalField } from './core';

interface IStore extends AdditionalField {
  auth: {
    error: string | null;
    loading: boolean;
  };

  user: ILoggedUser | null;
}

export type { IStore };
