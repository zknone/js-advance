import ProfileInfo from '../../components/profileInfo/ProfileInfo';
import TemplatePage from '../../core/templatePage/TemplatePage';
import type { AdditionalField } from '../../types/core';
import { PAGE } from '../../types/pages';

class ProfilePage extends TemplatePage<AdditionalField> {
  constructor() {
    super({
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
