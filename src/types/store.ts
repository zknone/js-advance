import type { IChat, ILoggedUser } from '../core/api/interfaces';
import type { ChatItemProps } from './chat';
import type { AdditionalField } from './core';

interface IStore extends AdditionalField {
  auth: {
    error: string | null;
    loading: boolean;
  };

  user: ILoggedUser | null;
  chats: ChatItemProps[] | null;
  chatsArchived: IChat[] | null;
}

export type { IStore };
