import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { ModalItemProps } from '../../types/chat';

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
        settings: {
          withInternalID: true,
        },
      },
      tagName,
      tagClassName
    );
  }

  render() {
    return this.compile('modalItem', this.props);
  }
}

export default ModalItem;
