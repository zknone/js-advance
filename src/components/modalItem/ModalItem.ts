import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { ModalItemProps } from '../../types/chat';
import InputItem from '../inputItem/InputItem';

class ModalItem extends TemplateBlock<ModalItemProps> {
  constructor(props: ModalItemProps) {
    const defaultProps: Partial<ModalItemProps> = {
      method: '',
      action: '',
      title: '',
      submitText: '',
      isOpen: false,
      inputId: 'avatar',
      inputName: 'Avatar',
      labelText: 'avatar',
    };

    const tagName = 'section';
    const tagClassName = `modal-overlay ${props.isOpen ? 'open' : 'visually-hidden'}`;

    super(
      'modalItem',
      {
        ...defaultProps,
        ...props,
        isAvatar: props.type === 'avatar',
        isInput: props.type === 'input',
        settings: {
          withInternalID: true,
        },
        events: {
          submit: {
            handler: (e: Event) => {
              e.preventDefault();
              props.onSubmit?.(e);
            },
          },
        },
      },
      tagName,
      tagClassName
    );
  }

  render() {
    if (this.props.isInput) {
      this.children.inputItem = new InputItem({
        value: '',
        type: 'text',
        placeholder: `Введите ${this.props.inputName} id`,
        title: `${this.props.inputName} id`,
        error: null,
        name: this.props.inputId,
        variant: 'regular',
      });
    }
    return this.compile('modalItem', this.props);
  }
}

export default ModalItem;
