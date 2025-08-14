import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { CustomFormProps, InputItemProps } from '../../types/chat';

import CustomButton from '../customButton/CustomButton';
import CustomLink from '../customLink/CustomLink';
import InputItem from '../inputItem/InputItem';

class CustomForm extends TemplateBlock<CustomFormProps> {
  constructor(props: CustomFormProps) {
    const defaultProps: Partial<CustomFormProps> = {};

    const tagName = 'section';
    const tagNameClass = 'custom-form';

    super(
      'customForm',
      {
        ...defaultProps,
        ...props,
        settings: {
          withInternalID: true,
        },
      },
      tagName,
      tagNameClass
    );
  }

  // componentDidUpdate(oldProps: CustomFormProps, newProps: CustomFormProps): boolean {
  //   (this.children.customButton as CustomButton).setProps(newProps);
  //   return true;
  // }

  render() {
    this.children.customButton = new CustomButton(this.props.customButton);
    this.children.customLink = new CustomLink(this.props.customLink);

    const items = (this.props.inputFields ?? []).map((f: InputItemProps) => new InputItem(f));
    this.children.inputFields = items;

    return this.compile('customForm', this.props);
  }
}

export default CustomForm;
