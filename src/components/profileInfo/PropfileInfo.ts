import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import { baseFields } from '../../mocks/profile';
import type { ProfileInfoModeProps, ProfileInfoProps, ProfilePageProps } from '../../types/chat';
import ProfileInfoEdit from '../profileInfoEdit/ProfileIfnoEdit';
import ProfileInfoView from '../profileInfoView/PofileInfoView';

class ProfileInfo extends TemplateBlock<ProfileInfoProps> {
  constructor(props: ProfilePageProps) {
    const defaultProps: ProfileInfoProps = {
      className: '',
      infoFields: baseFields,
      name: '',
    };

    super('profileInfo', {
      ...defaultProps,
      ...props,
      name: typeof props.name === 'string' ? props.name : '',
      settings: { withInternalID: true },
    });
  }

  render(): DocumentFragment {
    const isEditing = this.props.mode === 'edit';

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
