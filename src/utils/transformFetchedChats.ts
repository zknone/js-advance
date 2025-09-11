import type { IChat } from '../core/api/interfaces';
import type { ChatItemProps } from '../types/chat';

const transformFetchedChats = (data: IChat | IChat[]) => {
  const rawData = Array.isArray(data) ? data : [data];
  const modifiedChats: ChatItemProps[] = rawData.map((item) => ({
    name: item.name as string,
    time: item.item as string,
    unreadCount: item.unread_count,
    avatar: item.avatar,
    createdBy: item.created_by,
    lastMessage: {
      user: {
        firstName: item.last_message.user.first_name,
        secondName: item.last_message.user.second_name,
        avatar: item.last_message.user.avatar,
        email: item.last_message.user.email,
        login: item.last_message.user.login,
        phone: item.last_message.user.phone,
      },
      time: item.last_message.time as string,
      content: item.last_message.content,
    },
  }));

  return modifiedChats;
};

export default transformFetchedChats;
