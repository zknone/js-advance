import ProfileInfo from '../../components/profileInfo/ProfileInfo';
import TemplatePage from '../../core/templatePage/TemplatePage';
import type { ProfilePageProps } from '../../types/chat';
import { PAGE } from '../../types/pages';

class ProfilePage extends TemplatePage<ProfilePageProps> {
  constructor(props: ProfilePageProps) {
    super({
      ...props,
      page: PAGE.PROFILE,
      settings: {
        withInternalID: true,
      },
      tagName: 'div',
      tagClassName: 'profile-page',
    });
  }

  protected gatherChildren() {
    this.children.profileInfo = new ProfileInfo(this.props);
  }
}

export default ProfilePage;
