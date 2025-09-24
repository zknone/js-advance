import CustomForm from '../../components/customForm/CustomForm';
import TemplatePage from '../../core/templatePage/TemplatePage';
import { loginFormDefaultProps } from '../../consts/login';
import type { CustomFormProps } from '../../types/chat';
import type { AdditionalField, BlockBasics } from '../../types/core';
import { PAGE } from '../../types/pages';
import getDataFromInputs from '../../utils/getDataFromInputs';
import userController from '../../services/user/userService';
import type { ILogin } from '../../types/api';

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
      customForm: loginFormDefaultProps,
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
