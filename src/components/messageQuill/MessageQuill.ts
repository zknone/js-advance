/* eslint-disable no-console */
import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { MessageQuillProps } from '../../types/chat';
import { validateInput } from '../../utils/validation';
import CustomButton from '../customButton/CustomButton';
import InputItem from '../inputItem/InputItem';

class MessageQuill extends TemplateBlock<MessageQuillProps> {
  private isValidated = true;

  private state: { message: string | null; fieldName: string | null } = {
    message: null,
    fieldName: null,
  };

  constructor(props: MessageQuillProps) {
    const defaultProps: Partial<MessageQuillProps> = {};

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
        this.state = {
          message: value,
          fieldName: name,
        };
      },
    });
    this.children.attachButton = new CustomButton(this.props.attachButton);
    this.children.sendButton = new CustomButton({
      ...this.props.sendButton,
      type: 'submit',
    });
    return this.compile('messageQuill', this.props);
  }
}

export default MessageQuill;
