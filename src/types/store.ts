import type { IChat, ILoggedUser } from './api';
import type { ChatItemProps, FormEditingState, MessageItemProps } from './chat';
import type { AdditionalField } from './core';

interface IStore extends AdditionalField {
  auth: {
    error: string | null;
    loading: boolean;
  } | null;

  user: ILoggedUser | null;
  chats: ChatItemProps[] | null;
  chatsArchived: IChat[] | null;
  messages: Record<number, MessageItemProps[]> | null;
  query?: {
    id?: number | string | null;
    editing: FormEditingState;
  };
}

export type { IStore };
