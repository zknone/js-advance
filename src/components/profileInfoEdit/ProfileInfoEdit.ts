import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { CustomButtonProps, ProfileInfoModeProps } from '../../types/chat';
import { validateInput } from '../../utils/validation';
import CustomButton from '../customButton/CustomButton';
import InfoEditField from '../infoEditField/InfoEditField';

class ProfileInfoEdit extends TemplateBlock<ProfileInfoModeProps> {
  constructor(props: ProfileInfoModeProps) {
    const defaultProps: Partial<ProfileInfoModeProps> = {};

    const tagName = 'form';
    const tagClassName = 'profile-info-form';
    super(
      'profileInfoEdit',
      {
        ...defaultProps,
        ...props,
        settings: { withInternalID: true },
      },
      tagName,
      tagClassName
    );
  }

  componentDidUpdate(oldProps: ProfileInfoModeProps, newProps: ProfileInfoModeProps): boolean {
    return oldProps.errors !== newProps.errors;
  }

  validateAllFields() {
    const updated = this.props.infoFields.map((field) => {
      const isValid = validateInput(field.value, field.name);
      return {
        ...field,
        error: isValid ? null : field.label,
      };
    });

    const hasErrors = updated.some((f) => f.error);

    this.setProps({
      infoFields: updated,
      errors: updated
        .filter((f) => f.error)
        .map((f) => f.error)
        .join(', '),
    });

    return !hasErrors;
  }

  render() {
    const editButtons: CustomButtonProps[] = [
      {
        text: 'Отправить',
        type: 'submit',
        tagName: 'button',
        tagClassName: 'custom-button',
        settings: {
          withInternalID: false,
        },
        events: {
          click: (e: Event) => {
            e.preventDefault();
            const isValid = this.validateAllFields();

            if (isValid) {
              console.log('Валидация пройдена');
            } else {
              console.log('Ошибки! Валидация не пройдена');
            }
          },
        },
      },
    ];

    /// дописать валидацию как в квилл

    this.children.infoFields = this.props.infoFields.map(
      (field, index) =>
        new InfoEditField({
          ...field,
          onFieldBlur: (value: string) => {
            const updated = [...this.props.infoFields];
            updated[index] = {
              ...updated[index],
              error: validateInput(value, updated[index].name) ? null : updated[index].label,
              value,
            };

            const allErrors = updated
              .map((item) => item.error)
              .filter(Boolean)
              .join(', ');

            this.setProps({
              infoFields: updated,
              errors: allErrors,
            });
          },
        })
    );
    this.children.buttons = editButtons.map((button) => new CustomButton(button));
    return this.compile('profileInfoEdit', this.props);
  }
}

export default ProfileInfoEdit;
