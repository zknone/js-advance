/* eslint-disable no-console */
import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { InfoFieldProps, ProfileInfoModeProps } from '../../types/chat';
import { validateInput } from '../../utils/validation';
import CustomButton from '../customButton/CustomButton';
import InfoEditField from '../infoEditField/InfoEditField';

class ProfileInfoEdit extends TemplateBlock<ProfileInfoModeProps> {
  private isValidated = true;

  private state: { inputFields: InfoFieldProps[] | null } = {
    inputFields: null,
  };

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
        events: {
          submit: {
            handler: (e: Event) => {
              e.preventDefault();
              e.stopPropagation();
              this.isValidated = this.validateAllFields();

              if (this.isValidated) {
                if (this.props.onSubmit) {
                  this.props.onSubmit(e);
                }
                this.isValidated = false;
              } else {
                this.isValidated = false;
              }
            },
          },
        },
      },
      tagName,
      tagClassName
    );

    this.state.inputFields = [...this.props.infoFields];
  }

  validateAllFields() {
    const fields = this.state.inputFields;

    if (fields) {
      const updatedFields = fields.map((field) => {
        const isValid = validateInput(field.value, field.name);
        return {
          ...field,
          error: isValid ? null : field.label,
        };
      });

      const hasErrors = updatedFields.some((f) => f.error);
      const element = document.querySelector('[data-error]');
      const allErrors = updatedFields
        .map((item) => item.error)
        .filter(Boolean)
        .join(', ');

      if (element && hasErrors) {
        element.textContent = `Исправьте следующие ошибки: ${allErrors}`;
      }

      this.state.inputFields = updatedFields;

      return !hasErrors;
    }
    return false;
  }

  render() {
    this.children.infoFields = this.props.infoFields.map(
      (field, index) =>
        new InfoEditField({
          ...field,
          onFieldChange: (value: string) => {
            if (this.state.inputFields) {
              this.state.inputFields[index] = { ...this.state.inputFields[index], value };
            }
          },
          onFieldBlur: () => {
            this.validateAllFields();
          },
        })
    );
    this.children.buttons = new CustomButton({
      text: 'Отправить',
      type: 'submit',
      variant: 'primary',
      tagName: 'button',
      tagClassName: 'custom-button',
      settings: {
        withInternalID: false,
      },
    });
    return this.compile('profileInfoEdit', this.props);
  }
}

export default ProfileInfoEdit;
