import type { AdditionalField, BlockBasics, Path } from './core';

export type EventHandler = (e: Event) => void;

export type EventMap = {
  [K in keyof HTMLElementEventMap]?: {
    handler: EventHandler;
    selector?: string;
  };
};
export interface ChatItemProps extends AdditionalField {
  name: string;
  time: string;
  className?: string;
  unreadCount?: number;
  events?: EventMap;
  avatar: string;
  createdBy: number;
  lastMessage: {
    user: {
      firstName: string;
      secondName: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
}

export interface ChatListProps extends BlockBasics<AdditionalField> {
  chatList: ChatItemProps[];
}

interface IconSpec {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ChatMenuProps extends BlockBasics<AdditionalField> {
  name?: string;
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

export type Colors = 'red' | 'blue' | 'white';
export type ButtonVariants = 'primary' | 'link' | 'icon';

export interface CustomButtonProps extends BlockBasics<AdditionalField> {
  text: string | null;
  color?: Colors;
  variant?: ButtonVariants;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  icon?: IconSpec;
  path?: Path;
}

export interface CustomFormProps extends BlockBasics<AdditionalField> {
  title: string;
  customButton: CustomButtonProps;
  inputFields: InputItemProps[];
  customLink: CustomLinkProps;
}

export interface CustomLinkProps extends BlockBasics<AdditionalField> {
  text: string;
  href: string;
}

export interface InputItemProps extends BlockBasics<AdditionalField> {
  value: string | null;
  title: string | null;
  type: string;
  placeholder: string;
  error: string | null;
  name: string;
  variant: 'regular' | 'quill';
}

export interface MessageListProps extends BlockBasics<AdditionalField> {
  messageList: MessageItemProps[];
}

export interface MessageItemProps extends BlockBasics<AdditionalField> {
  text: string;
  isOwn?: boolean;
  time: string;
  image?: string;
}

export interface MessageQuillProps extends BlockBasics<AdditionalField> {
  inputItem: InputItemProps;

  showAttachmentMenu?: boolean;
  imgIcon?: IconSpec;
  fileIcon?: IconSpec;
  locationIcon?: IconSpec;

  attachButton: CustomButtonProps;
  sendButton: CustomButtonProps;

  labels?: {
    attach?: string;
    photoVideo?: string;
    file?: string;
    location?: string;
    send?: string;
  };
}

export interface ModalItemProps extends BlockBasics<AdditionalField> {
  method: string;
  action: string;
  title: string;
  submitText: string;
  isOpen?: boolean;
  inputId: string;
  inputName: string;
  labelText: string;
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

export interface InfoFieldProps extends BlockBasics<AdditionalField> {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  value: string | null;
  error: string | null;
}

export interface ProfileInfoModeProps extends BlockBasics<AdditionalField> {
  infoFields: InfoFieldProps[];
  button?: CustomButtonProps;
  onSubmit?: () => void;
}

export interface ProfileInfoProps extends BlockBasics<AdditionalField> {
  className?: string;
  name: string;
  avatar?: AvatarCfg;
  infoFields: InfoFieldProps[];
  modalItem?: ModalItemProps;
  query: {
    editing: null | 'credentials' | 'pass';
  };
}

export type ProfilePageProps = Omit<ProfileInfoProps, 'infoFields'>;

export interface SearchProps extends BlockBasics<AdditionalField> {
  value?: string;
  className?: string;
  placeholder?: string;
  name?: string;
}

export type ProfileMods = 'view' | 'edit-pass' | 'edit-credentials';
