export type AdditionalField = Record<string, unknown>;

export interface ChatItemProps extends AdditionalField {
  name: string;
  time: string;
  className?: string;
  message: string;
  unreadCount?: number;
  events?: Record<string, EventListenerOrEventListenerObject>;
}
