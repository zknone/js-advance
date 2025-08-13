import CustomForm from '../../components/customForm/CustomForm';
import TemplatePage from '../../core/templatePage/TemplatePage';
import type { CustomFormProps } from '../../types/chat';
import type { AdditionalField, BlockBasics } from '../../types/core';
import { PAGE } from '../../types/pages';

interface LoginPageProps extends BlockBasics<AdditionalField> {
  customForm: CustomFormProps;
}

class LoginPage extends TemplatePage<LoginPageProps> {
  constructor(props: LoginPageProps) {
    super({
      ...props,
      page: PAGE.LOGIN,
      settings: {
        withInternalID: true,
      },
    });
  }

  protected gatherChildren() {
    this.children.customForm = new CustomForm({
      ...this.props.customForm,
      settings: { withInternalID: true },
    });
  }
}

export default LoginPage;
