import CustomForm from '../../components/customForm/CustomForm';
import TemplatePage from '../../core/templatePage/TemplatePage';
import { signupFormData } from '../../mocks/signup';
import type { CustomFormProps } from '../../types/chat';
import type { AdditionalField, BlockBasics } from '../../types/core';
import { PAGE } from '../../types/pages';

interface SignupPageProps extends BlockBasics<AdditionalField> {
  customForm: CustomFormProps;
}

const tagClassName = 'signup-page';
const insideFormClassName = '.custom-form';

class SignupPage extends TemplatePage<SignupPageProps> {
  constructor() {
    super({
      page: PAGE.SIGN_UP,
      settings: {
        withInternalID: true,
      },
      tagName: 'div',
      tagClassName: 'signup-page',
      customForm: signupFormData,
    });
  }

  protected gatherChildren() {
    this.children.customForm = new CustomForm(this.props.customForm);
  }
}

export default SignupPage;
