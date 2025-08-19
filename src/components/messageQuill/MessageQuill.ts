import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { MessageQuillProps } from '../../types/chat';
import CustomButton from '../customButton/CustomButton';

class MessageQuill extends TemplateBlock<MessageQuillProps> {
  constructor(props: MessageQuillProps) {
    const defaultProps: Partial<MessageQuillProps> = {
      className: '',
      placeholder: 'Сообщение',
      inputName: 'message',
      autoComplete: 'off',
      value: '',
      disabled: false,
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
      labels: {
        attach: 'Прикрепить файл',
        photoVideo: 'Фото и видео',
        file: 'Файл',
        location: 'Локация',
        send: 'Отправить',
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
    console.log(this.props.attachButton);
    this.children.attachButton = new CustomButton(this.props.attachButton);
    this.children.sendButton = new CustomButton(this.props.sendButton);
    return this.compile('messageQuill', this.props);
  }
}

export default MessageQuill;
