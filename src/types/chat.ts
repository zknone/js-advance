export interface ChatItemProps {
  name: string;
  time: string;
  className?: string;
  message: string;
  unreadCount?: number;
  events?: Record<string, EventListenerOrEventListenerObject>;
}
