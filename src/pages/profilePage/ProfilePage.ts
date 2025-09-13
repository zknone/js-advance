import CustomButton from '../../components/customButton/CustomButton';
import ProfileInfo from '../../components/profileInfo/ProfileInfo';
import router from '../../core/routerEngine/router';
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
    this.children.customButton = new CustomButton({
      text: null,
      variant: 'icon',
      icon: {
        src: '/public/exit-icon.svg',
        alt: 'Назад',
      },
      type: 'button',
      onClick: () => {
        router.back();
      },
    });
    this.children.profileInfo = new ProfileInfo(this.props);
  }
}

export default ProfilePage;
