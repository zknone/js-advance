import CustomButton from '../customButton/CustomButton';
import type { CustomButtonProps } from '../../types/chat';

export type ActionType = 'add' | 'delete';

interface ActionChatButtonProps extends Omit<CustomButtonProps, 'icon' | 'color'> {
  action: ActionType;
}

class ActionChatButton extends CustomButton {
  constructor(props: ActionChatButtonProps) {
    const icons = {
      add: {
        src: '/add-cross.svg',
        alt: 'Добавить пользователя',
        width: 16,
        height: 16,
      },
      delete: {
        src: '/delete-cross.svg',
        alt: 'Удалить пользователя',
        width: 16,
        height: 16,
      },
    };

    super({
      ...props,
      icon: icons[props.action],
      type: 'button',
      text: props.action === 'add' ? 'Добавить' : 'Удалить',
    });
  }
}

export default ActionChatButton;
