import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { ChatMenuProps } from '../../types/chat';

/**
 * ChatMenu
 *
 * @param props Props inside: { name: string}
}
 */
class ChatList extends TemplateBlock<ChatMenuProps> {
  constructor(props: ChatMenuProps) {
    const defaultProps: Partial<ChatMenuProps> = {
      className: '',
      menuOpened: false,
      showAdd: true,
      showDelete: true,
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
    };
    super('chatMenu', {
      ...props,
      ...defaultProps,
      settings: {
        withInternalID: true,
      },
    });
  }
}

export default ChatList;
