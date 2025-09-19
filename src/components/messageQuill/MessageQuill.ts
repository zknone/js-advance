import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { MessageQuillProps } from '../../types/chat';
import { validateInput } from '../../utils/validation';
import CustomButton from '../customButton/CustomButton';
import InputItem from '../inputItem/InputItem';

class MessageQuill extends TemplateBlock<MessageQuillProps> {
  private isValidated = true;

  _state: { message: string | null; fieldName: string | null } = {
    message: null,
    fieldName: null,
  };

  private handleAttachmentButtonClick = () => {
    this.setProps({
      ...this.props,
      showAttachmentMenu: !this.props.showAttachmentMenu,
    });
  };

  constructor(props: MessageQuillProps) {
    const defaultProps: Partial<MessageQuillProps> = {
      imgIcon: {
        src: './attach-icon.svg',
        alt: '',
      },
      fileIcon: {
        src: './file-icon.svg',
        alt: '',
      },
      locationIcon: {
        src: './location-icon.svg',
        alt: '',
      },
      labels: {
        photoVideo: 'Прикрепить медиа',
        file: 'Прикрепить файл',
        location: 'Указать локацию',
      },
    };

    const tagName = 'div';
    const tagClassName = 'message-quill';

    super(
      'messageQuill',
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
    const { inputItem } = this.props;
    this.children.inputItem = new InputItem({
      ...this.props.inputItem,
      onFieldBlur: (value: string, name: string) => {
        this.isValidated = validateInput(value, name);

        if (!this.isValidated) {
          this.setProps({
            ...this.props,
            inputItem: {
              ...inputItem,
              placeholder: 'Не забудьте ввести сообщение',
            },
          });
        }
      },
      onFieldChange: (value: string, name: string) => {
        this._state = {
          message: value,
          fieldName: name,
        };
      },
    });
    this.children.attachButton = new CustomButton({
      ...this.props.attachButton,
      onClick: () => this.handleAttachmentButtonClick(),
    });
    this.children.sendButton = new CustomButton({
      ...this.props.sendButton,
      type: 'submit',
    });
    return this.compile('messageQuill', this.props);
  }
}

export default MessageQuill;
