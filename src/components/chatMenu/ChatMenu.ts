/* eslint-disable nonblock-statement-body-position */
import chatAPI from '../../core/api/chatApi';
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
        events: {
          click: {
            handler: (e: Event) => {
              const target = e.target as HTMLElement;
              if (target.closest('.chat-menu__actions-main-button')) {
                this.toggleMenu();
              }

              if (target.closest('.chat-menu__actions-button--delete')) {
                this.toggleToDelete();
              }

              if (target.closest('.chat-menu__actions-button--add')) {
                this.toggleToAdd();
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
    this.children.modalItem = new ModalItem({
      type: 'input',
      method: 'POST',
      action: '',
      title:
        this.props.modalOpen === 'add' ? 'Добавить нового пользователя' : 'Удалить пользователя',
      submitText: this.props.modalOpen === 'add' ? 'Добавить' : 'Удалить',
      isOpen: Boolean(this.props.modalOpen),
      inputId: 'user',
      inputName: 'user',
      labelText: 'Пользователь',
      onSubmit: () => {
        const { id: userId } = getDataFromInputs('modal__content');
        const { id: chatId } = this.props.chat!;
        if (chatId) {
          if (this.props.modalOpen === 'add') {
            chatAPI.addUsersToChat({ users: [userId], chatId });
          } else {
            chatAPI.removeUsersFromChat({ users: [userId], chatId });
          }
        }

        this.closeModal();
      },
    });

    return this.compile('chatMenu', this.props);
  }

  toggleToDelete() {
    this.setProps({ ...this.props, modalOpen: 'delete' });
    document.addEventListener('click', this.handleOutsideModalClick, true);
  }

  toggleToAdd() {
    this.setProps({ ...this.props, modalOpen: 'add' });
    document.addEventListener('click', this.handleOutsideModalClick, true);
  }

  closeModal() {
    this.setProps({ ...this.props, modalOpen: null });
    document.removeEventListener('click', this.handleOutsideModalClick, true);
  }
}

export default ChatMenu;
