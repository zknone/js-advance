import type { AdditionalField, BlockBasics } from './core';

export interface ChatItemProps extends AdditionalField {
  name: string;
  time: string;
  className?: string;
  message: string;
  unreadCount?: number;
  events?: Record<string, EventListenerOrEventListenerObject>;
}

export interface ChatListProps extends BlockBasics<AdditionalField> {
  chats: ChatItemProps[];
}

interface IconSpec {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ChatMenuProps extends BlockBasics<AdditionalField> {
  className?: string;
  name: string;
  menuOpened?: boolean;
  showAdd?: boolean;
  showDelete?: boolean;
  labels?: {
    openMenu: string;
    addUser: string;
    deleteUser: string;
  };
  icons?: {
    menu: IconSpec;
    addBg: IconSpec;
    addCross: IconSpec;
    deleteBg: IconSpec;
    deleteCross: IconSpec;
  };
}

export interface CustomButtonProps extends BlockBasics<AdditionalField> {
  text: string;
  className?: string;
  variant?: 'primary' | 'link';
  type?: 'button' | 'submit' | 'reset';
}

export interface ChatFormProps extends BlockBasics<AdditionalField> {
  title: string;
  customButton: CustomButtonProps;
  inputFiled: [];
  customLink: CustomLinkProps;
}

export interface CustomLinkProps extends BlockBasics<AdditionalField> {
  title: string;
  href: string;
}

export interface InputItemProps extends BlockBasics<AdditionalField> {
  title: string;
  href: string;
  type: string;
  placeholder: string;
  error: string;
  name: string;
}

export interface MessageListProps extends BlockBasics<AdditionalField> {
  messages: MessageItemProps[];
}

export interface MessageItemProps extends BlockBasics<AdditionalField> {
  text: string;
  isOwn: boolean;
  time: string;
  image: string;
}

export interface MessageQuillProps extends BlockBasics<AdditionalField> {
  className?: string;

  placeholder?: string;
  inputName?: string;
  autoComplete?: string;
  value?: string;
  disabled?: boolean;

  showAttachmentMenu?: boolean;
  attachIcon?: IconSpec;
  imgIcon?: IconSpec;
  fileIcon?: IconSpec;
  locationIcon?: IconSpec;

  sendIcon?: IconSpec;

  labels?: {
    attach?: string;
    photoVideo?: string;
    file?: string;
    location?: string;
    send?: string;
  };
}

export interface ModalItemProps extends BlockBasics<AdditionalField> {
  className?: string;

  modalId?: string;
  inputId?: string;

  title?: string;
  labelText?: string;
  submitText?: string;

  method?: 'post' | 'get';
  enctype?: 'multipart/form-data' | 'application/x-www-form-urlencoded' | 'text/plain';
  action?: string;

  inputName?: string;
  accept?: string;
  multiple?: boolean;
  required?: boolean;

  ariaAttachLabel?: string;

  isOpen?: boolean;
}

export interface Field {
  name: string;
  label: string;
  value?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'tel';
}

export interface ActionLink {
  text: string;
  href: string;
  variant?: 'link' | 'primary';
  color?: 'blue' | 'red';
}

export interface AvatarCfg {
  changeText?: string;
  iconSrc?: string;
  iconAlt?: string;
  iconW?: number;
  iconH?: number;
}

export interface ProfileInfoProps extends BlockBasics<AdditionalField> {
  className?: string;
  name: string;
  mode?: 'view' | 'edit';
  fields: Field[];
  actions?: {
    editCredentials?: ActionLink;
    editPass?: ActionLink;
    logout?: ActionLink;
  };
  avatar?: AvatarCfg;
  showModal?: boolean;
  modalProps?: Record<string, unknown>;
}

export interface SearchProps extends BlockBasics<AdditionalField> {
  value?: string;
  className?: string;
  placeholder?: string;
  name?: string;
}
