import CustomForm from '../../components/customForm/CustomForm';
import TemplatePage from '../../core/templatePage/TemplatePage';
import { PAGE, type LoginPageFormProps } from '../../types/pages';

class LoginPage extends TemplatePage<LoginPageFormProps> {
  constructor(props: LoginPageFormProps) {
    super({
      ...props,
      page: PAGE.LOGIN,
      settings: {
        withInternalID: true,
      },
      tagName: 'div',
      tagClassName: 'login-page',
    });
  }

  protected gatherChildren() {
    this.children.customForm = new CustomForm({
      ...this.props,
      settings: { withInternalID: true },
    });
  }
}

export default LoginPage;
