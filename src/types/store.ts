import type { IChat, ILoggedUser } from '../core/api/interfaces';
import type { ChatItemProps, MessageItemProps } from './chat';
import type { AdditionalField } from './core';

interface IStore extends AdditionalField {
  auth: {
    error: string | null;
    loading: boolean;
  };

  user: ILoggedUser | null;
  chats: ChatItemProps[] | null;
  chatsArchived: IChat[] | null;
  messages: Record<number, Record<number, MessageItemProps>>;
  query: {
    id: number | string | null;
    editing: 'view' | 'credentials' | 'pass';
  };
}

export type { IStore };
