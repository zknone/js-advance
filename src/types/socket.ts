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
  file?: IFile;
  is_read: boolean;
}

export interface IFile {
  id: number;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
}

export type { ISocketData, IMessageResponse };
