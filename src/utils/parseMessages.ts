import type { MessageItemProps } from '../types/chat';
import type { IMessageResponse } from '../types/socket';

const parseMessages = (
  parsed: IMessageResponse | IMessageResponse[]
): MessageItemProps[] | MessageItemProps => {
  if (Array.isArray(parsed)) {
    return parsed.map((item) => ({
      id: item.id,
      text: item.content,
      time: item.time,
      type: item.type,
    }));
  }
  return {
    id: parsed.id,
    text: parsed.content,
    time: parsed.time,
    type: parsed.type,
  };
};

export default parseMessages;
