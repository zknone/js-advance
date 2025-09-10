import CustomForm from '../../components/customForm/CustomForm';
import userController from '../../controllers/user/userController';
import type { INewUser } from '../../core/api/interfaces';
import TemplatePage from '../../core/templatePage/TemplatePage';
import { signupFormData } from '../../mocks/signup';
import type { CustomFormProps } from '../../types/chat';
import type { AdditionalField, BlockBasics } from '../../types/core';
import { PAGE } from '../../types/pages';
import getDataFromInputs from '../../utils/getDataFromInputs';

interface SignupPageProps extends BlockBasics<AdditionalField> {
  customForm: CustomFormProps;
}

const tagClassName = 'signup-page';
const insideFormClassName = 'custom-form';

class SignupPage extends TemplatePage<SignupPageProps> {
  constructor() {
    super({
      page: PAGE.SIGN_UP,
      settings: {
        withInternalID: true,
      },
      tagName: 'div',
      tagClassName,
      customForm: signupFormData,
    });
  }

  protected gatherChildren() {
    this.children.customForm = new CustomForm({
      ...this.props.customForm,
      events: {
        submit: {
          handler: (e: Event) => {
            e.preventDefault();
            const data = getDataFromInputs(insideFormClassName);
            userController.signUp(data as INewUser);
          },
        },
      },
    });
  }
}

export default SignupPage;
