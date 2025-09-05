import ChatAPI from '../../core/api/chatAPI';
import store from '../../core/store/store';

class ChatController {
  public createChat(id: string) {
    ChatAPI.create(id).then((data) => store.set('user', data));
  }
}

export default ChatController;
