import CustomForm from '../../components/customForm/CustomForm';
import TemplatePage from '../../core/templatePage/TemplatePage';
import type { CustomFormProps } from '../../types/chat';
import { PAGE } from '../../types/pages';

class LoginPage extends TemplatePage<CustomFormProps> {
  constructor(props: CustomFormProps) {
    super({
      ...props,
      page: PAGE.MAIN,
      settings: {
        withInternalID: true,
      },
      tagName: 'div',
      tagClassName: 'main-page',
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
