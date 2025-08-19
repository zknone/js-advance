import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { MessageQuillProps } from '../../types/chat';
import CustomButton from '../customButton/CustomButton';
import InputItem from '../inputItem/InputItem';

class MessageQuill extends TemplateBlock<MessageQuillProps> {
  constructor(props: MessageQuillProps) {
    const defaultProps: Partial<MessageQuillProps> = {
      inputItem: {
        value: null,
        variant: 'quill',
        title: null,
        type: 'text',
        placeholder: 'Введите сообщение',
        error: null,
        name: 'message',
      },
      showAttachmentMenu: false,
      attachButton: {
        icon: {
          src: '/attach-icon.svg',
          alt: 'Прикрепить файл',
          width: 32,
          height: 32,
        },
        variant: 'icon',
        text: null,
      },
      attachmentMenu: {
        imgIcon: {
          src: '/img-icon.svg',
          alt: 'Фото и видео',
          width: 22,
          height: 22,
        },
        fileIcon: {
          src: '/file-icon.svg',
          alt: 'Файл',
          width: 22,
          height: 22,
        },
        locationIcon: {
          src: '/location-icon.svg',
          alt: 'Локация',
          width: 22,
          height: 22,
        },
        labels: {
          attach: 'Прикрепить файл',
          photoVideo: 'Фото и видео',
          file: 'Файл',
          location: 'Локация',
          send: 'Отправить',
        },
      },
      sendButton: {
        text: null,
        variant: 'icon',
        icon: {
          src: '/send-icon.svg',
          alt: 'Отправить сообщение',
          width: 28,
          height: 28,
        },
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
      onChange: (newValue: string) => {
        this.props.inputItem.value = newValue;
      },
    });
    this.children.attachButton = new CustomButton(this.props.attachButton);
    this.children.sendButton = new CustomButton({
      ...this.props.sendButton,
      events: {
        click: (e: Event) => {
          e.preventDefault();

          const result = inputItem.value;

          console.log({ result });
        },
      },
    });
    return this.compile('messageQuill', this.props);
  }
}

export default MessageQuill;
