import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import { baseFields } from '../../mocks/profile';
import type { ProfileInfoModeProps, ProfileInfoProps, ProfilePageProps } from '../../types/chat';
import ModalItem from '../modalItem/ModalItem';
import ProfileInfoEdit from '../profileInfoEdit/ProfileIfnoEdit';
import ProfileInfoView from '../profileInfoView/PofileInfoView';

class ProfileInfo extends TemplateBlock<ProfileInfoProps> {
  constructor(props: ProfilePageProps) {
    const defaultProps: ProfileInfoProps = {
      infoFields: baseFields,
      name: '',
    };
    const tagName = 'section';
    const tagClassName = 'profile-info';

    super(
      'profileInfo',
      {
        ...defaultProps,
        ...props,
        name: typeof props.name === 'string' ? props.name : '',
        settings: { withInternalID: true },
      },
      tagName,
      tagClassName
    );
  }

  render(): DocumentFragment {
    const isEditing = this.props.mode === 'edit';

    const { modalItem } = this.props;

    if (modalItem) {
      this.children.modalItem = new ModalItem(modalItem);
    }

    const modeProps: ProfileInfoModeProps = {
      infoFields: this.props.infoFields,
    };

    this.children.infoFields = isEditing
      ? new ProfileInfoEdit(modeProps)
      : new ProfileInfoView(modeProps);

    return this.compile('profileInfo', this.props);
  }
}

export default ProfileInfo;
