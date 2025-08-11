import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { MessageQuillProps } from '../../types/chat';

/**
 * MessageQuill
 *
 * @param props Props inside: { className?: string;
 *  placeholder?: string;
 *  inputName?: string;
 *  autoComplete?: string;
 *  value?: string;
 *  disabled?: boolean;
 *  showAttachmentMenu?: boolean;
 *  attachIcon?: IconSpec;
 *  imgIcon?: IconSpec;
 *  fileIcon?: IconSpec;
 *  locationIcon?: IconSpec;
 *  sendIcon?: IconSpec;
 *  labels?: {
 *    attach?: string;
 *    photoVideo?: string;
 *    file?: string;
 *    location?: string;
 *    send?: string;
 *  } }
 */

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
      attachIcon: {
        src: '/attach-icon.svg',
        alt: 'Прикрепить файл',
        width: 32,
        height: 32,
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
      sendIcon: {
        src: '/send-icon.svg',
        alt: 'Отправить сообщение',
        width: 28,
        height: 28,
      },
      labels: {
        attach: 'Прикрепить файл',
        photoVideo: 'Фото и видео',
        file: 'Файл',
        location: 'Локация',
        send: 'Отправить',
      },
    };

    super('messageQuill', {
      ...defaultProps,
      ...props,
      settings: {
        withInternalID: true,
      },
    });
  }

  render(): DocumentFragment {
    return this.compile('messageQuill', this.props);
  }
}

export default MessageQuill;
