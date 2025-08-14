import CustomForm from '../../components/customForm/CustomForm';
import TemplatePage from '../../core/templatePage/TemplatePage';
import type { CustomFormProps } from '../../types/chat';
import type { AdditionalField, BlockBasics } from '../../types/core';
import { PAGE } from '../../types/pages';

interface SignupPageProps extends BlockBasics<AdditionalField> {
  customForm: CustomFormProps;
}

class SignupPage extends TemplatePage<SignupPageProps> {
  constructor(props: SignupPageProps) {
    super({
      ...props,
      page: PAGE.SIGN_UP,
      settings: {
        withInternalID: true,
      },
      tagName: 'div',
      tagClassName: 'signup-page',
    });
  }

  protected gatherChildren() {
    this.children.customForm = new CustomForm(this.props.customForm);
  }
}

export default SignupPage;
