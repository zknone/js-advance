interface ISocketData {
  userId: number;
  chatId: number;
  token: string;
}

interface IMessageResponse {
  content: string;
  type: string;
  time: string;
  user_id: number;
  id: number;
}
export type { ISocketData, IMessageResponse };
