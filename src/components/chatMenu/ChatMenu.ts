/* eslint-disable nonblock-statement-body-position */
import { API_BASE_URL } from '../../consts/api';
import chatController from '../../controllers/chat/chatController';
import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { ChatMenuProps } from '../../types/chat';
import getDataFromInputs from '../../utils/getDataFromInputs';
import ModalItem from '../modalItem/ModalItem';

class ChatMenu extends TemplateBlock<ChatMenuProps> {
  constructor(props: ChatMenuProps) {
    const defaultProps: Partial<ChatMenuProps> = {
      chat: {
        id: 0,
        name: 'Error',
        avatar: null,
        createdBy: 0,
        lastMessage: null,
      },
      menuOpened: false,
      modalOpen: null,
      labels: {
        openMenu: 'Открыть меню',
        addUser: 'Добавить пользователя',
        deleteUser: 'Удалить пользователя',
        addAvatar: 'Установить аватар',
        deleteChat: 'Удалить чат',
      },
      icons: {
        menu: {
          src: '/menu-icon.svg',
          alt: 'Открыть меню',
          width: 3,
          height: 15,
        },
        addBg: {
          src: '/add-icon.svg',
          alt: 'Фон иконки добавления',
          width: 22,
          height: 22,
        },
        addCross: {
          src: '/add-cross.svg',
          alt: 'Иконка добавления',
          width: 11,
          height: 11,
        },
        deleteBg: {
          src: '/delete-icon.svg',
          alt: 'Фон иконки удаления',
          width: 22,
          height: 22,
        },
        deleteCross: {
          src: '/delete-cross.svg',
          alt: 'Иконка удаления',
          width: 11,
          height: 11,
        },
        addAvatar: {
          src: '/img-icon.svg',
          alt: 'Фон иконки удаления',
          width: 22,
          height: 22,
        },
        deleteChat: {
          src: '/location-icon.svg',
          alt: 'Иконка удаления',
          width: 11,
          height: 11,
        },
      },
      settings: {
        withInternalID: true,
      },
    };
    super(
      'chatMenu',
      {
        ...defaultProps,
        ...props,
        avatar: props.chat?.avatar ? `${API_BASE_URL}/resources${props.chat?.avatar}` : null,
        events: {
          click: {
            handler: (e: Event) => {
              const target = e.target as HTMLElement;
              if (target.closest('.chat-menu__actions-main-button')) {
                this.toggleMenu();
              }

              if (target.closest('.chat-menu__actions-button--delete')) {
                this.toggleToDeleteUser();
              }

              if (target.closest('.chat-menu__actions-button--add')) {
                this.toggleToAddUser();
              }

              if (target.closest('.chat-menu__actions-button--avatar')) {
                this.toggleToChangeAvatar();
              }

              if (target.closest('.chat-menu__actions-button--delete-chat')) {
                this.toggleDeleteChat();
              }
            },
          },
        },
      },
      'div',
      'chat-menu'
    );
  }

  private handleOutsideModalClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (!target.closest('.modal')) {
      this.closeModal();
    }
  };

  private handleOutsideMenuClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const root = this.getContent();

    if (root && !root.contains(target) && this.props.menuOpened) {
      this.toggleMenu();
    }
  };

  toggleMenu() {
    const menuOpened = !this.props.menuOpened;
    this.setProps({ ...this.props, menuOpened });

    if (menuOpened) {
      document.addEventListener('click', this.handleOutsideMenuClick, true);
    } else {
      document.removeEventListener('click', this.handleOutsideMenuClick, true);
    }
  }

  render() {
    let modalProps: any = {
      method: 'POST',
      action: '',
      isOpen: Boolean(this.props.modalOpen),
    };

    if (this.props.modalOpen === 'add') {
      modalProps = {
        ...modalProps,
        type: 'input',
        title: 'Добавить нового пользователя',
        submitText: 'Добавить',
        inputId: 'user',
        inputName: 'user',
        labelText: 'Пользователь',
      };
    } else if (this.props.modalOpen === 'delete') {
      modalProps = {
        ...modalProps,
        type: 'input',
        title: 'Удалить пользователя',
        submitText: 'Удалить',
        inputId: 'user',
        inputName: 'user',
        labelText: 'Пользователь',
      };
    } else if (this.props.modalOpen === 'avatar') {
      modalProps = {
        ...modalProps,
        type: 'avatar',
        title: 'Загрузить аватар чата',
        submitText: 'Сохранить',
        inputId: 'avatar',
        inputName: 'avatar',
        labelText: 'Выберите файл',
      };
    } else if (this.props.modalOpen === 'delete-chat') {
      modalProps = {
        ...modalProps,
        type: 'input',
        title: 'Удалить чат',
        submitText: 'Удалить',
        inputId: 'chat',
        inputName: 'chat',
        labelText: 'Напишите "Да", чтобы подтвердить',
      };
    }

    this.children.modalItem = new ModalItem({
      ...modalProps,
      onSubmit: (e: Event) => {
        const form = e.target as HTMLFormElement;
        const { id: chatId } = this.props.chat!;

        if (!chatId) return;

        if (this.props.modalOpen === 'add') {
          const { user } = getDataFromInputs('modal__content');
          chatController.addUsersToChat([user], chatId);
        } else if (this.props.modalOpen === 'delete') {
          const { user } = getDataFromInputs('modal__content');
          chatController.removeUsersFromChat([user], chatId);
        } else if (this.props.modalOpen === 'avatar') {
          const input = form.querySelector<HTMLInputElement>('input[type="file"]');
          const file = input?.files?.[0];
          if (file) {
            chatController.addAvatar(chatId, file);
          }
        } else if (this.props.modalOpen === 'delete-chat') {
          chatController.deleteChat(chatId);
        }

        this.closeModal();
      },
    });

    return this.compile('chatMenu', this.props);
  }

  toggleToDeleteUser() {
    this.setProps({ ...this.props, modalOpen: 'delete' });
    document.addEventListener('click', this.handleOutsideModalClick, true);
  }

  toggleToAddUser() {
    this.setProps({ ...this.props, modalOpen: 'add' });
    document.addEventListener('click', this.handleOutsideModalClick, true);
  }

  toggleToChangeAvatar() {
    this.setProps({ ...this.props, modalOpen: 'avatar' });
    document.addEventListener('click', this.handleOutsideModalClick, true);
  }

  toggleDeleteChat() {
    this.setProps({ ...this.props, modalOpen: 'delete-chat' });
    document.addEventListener('click', this.handleOutsideModalClick, true);
  }

  closeModal() {
    this.setProps({ ...this.props, modalOpen: null });
    document.removeEventListener('click', this.handleOutsideModalClick, true);
  }
}

export default ChatMenu;
