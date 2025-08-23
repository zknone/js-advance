import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import { baseFields } from '../../mocks/profile';
import type { ProfileInfoProps, ProfilePageProps } from '../../types/chat';
import ModalItem from '../modalItem/ModalItem';
import ProfileInfoEdit from '../profileInfoEdit/ProfileInfoEdit';
import ProfileInfoView from '../profileInfoView/ProfileInfoView';

class ProfileInfo extends TemplateBlock<ProfileInfoProps> {
  constructor(props: ProfilePageProps) {
    const defaultProps: ProfileInfoProps = {
      infoFields: baseFields,
      name: typeof props.name === 'string' ? props.name : '',
      settings: { withInternalID: true },
    };
    const tagName = 'section';
    const tagClassName = 'profile-info';

    super(
      'profileInfo',
      {
        ...defaultProps,
        ...props,
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

    this.children.infoFields = isEditing
      ? new ProfileInfoEdit(this.props)
      : new ProfileInfoView(this.props);

    return this.compile('profileInfo', this.props);
  }
}

export default ProfileInfo;
