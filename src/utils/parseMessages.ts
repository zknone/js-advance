import type { MessageItemProps } from '../types/chat';
import type { IMessageResponse } from '../types/socket';

const parseMessages = (
  parsed: IMessageResponse | IMessageResponse[],
  userId: number
): MessageItemProps[] | MessageItemProps => {
  if (Array.isArray(parsed)) {
    return parsed.map((item) => ({
      id: item.id,
      text: item.content,
      time: item.time,
      type: item.type,
      isOwn: item.user_id === userId,
    }));
  }
  return {
    id: parsed.id,
    text: parsed.content,
    time: parsed.time,
    type: parsed.type,
    isOwn: parsed.user_id === userId,
  };
};

export default parseMessages;
