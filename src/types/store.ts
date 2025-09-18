import type { IChat, ILoggedUser } from './api';
import type { ChatItemProps, FormEditingState, MessageItemProps } from './chat';
import type { AdditionalField } from './core';

interface IStore extends AdditionalField {
  auth: {
    error: string | null;
    loading: boolean;
  };

  user: ILoggedUser | null;
  chats: ChatItemProps[] | null;
  chatsArchived: IChat[] | null;
  messages: Record<number, MessageItemProps[]>;
  query: {
    id: number | string | null;
    editing: FormEditingState;
  };
}

export type { IStore };
