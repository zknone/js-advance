import CustomForm from '../../components/customForm/CustomForm';
import TemplatePage from '../../core/templatePage/TemplatePage';
import { loginFormData } from '../../mocks/login';
import type { CustomFormProps } from '../../types/chat';
import type { AdditionalField, BlockBasics } from '../../types/core';
import { PAGE } from '../../types/pages';
import getDataFromInputs from '../../utils/getDataFromInputs';
import userController from '../../controllers/user/userController';
import type { ILogin } from '../../core/api/interfaces';

interface ILoginPageProps extends BlockBasics<AdditionalField> {
  customForm: CustomFormProps;
}

const tagClassName = 'login-page';
const insideFormClassName = 'custom-form';

class LoginPage extends TemplatePage<ILoginPageProps> {
  constructor() {
    super({
      page: PAGE.LOGIN,
      settings: {
        withInternalID: true,
      },
      tagName: 'div',
      tagClassName,
      customForm: loginFormData,
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
            userController.signIn(data as ILogin);
          },
        },
      },
      settings: { withInternalID: true },
    });
  }
}

export default LoginPage;
