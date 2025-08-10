import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { ModalItemProps } from '../../types/chat';

/**
 * ModalItem
 *
 * @param props Props inside: {}
 */

class ModalItem extends TemplateBlock<ModalItemProps> {
  constructor(props: ModalItemProps) {
    const defaultProps: Partial<ModalItemProps> = {
      className: '',
      modalId: 'avatarModal',
      inputId: 'fileInput',
      title: 'Загрузите файл',
      labelText: 'Выбрать файл на компьютере',
      submitText: 'Загрузить',
      method: 'post',
      enctype: 'multipart/form-data',
      action: '',
      inputName: 'avatar',
      accept: 'image/*',
      multiple: false,
      required: false,
      isOpen: true,
    };

    super('modalItem', {
      ...defaultProps,
      ...props,
      settings: {
        withInternalID: true,
      },
    });
  }
}

export default ModalItem;
