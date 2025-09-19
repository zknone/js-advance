import type { AdditionalField, BlockBasics, Path } from './core';

export type EventHandler = (e: Event) => void;

export type EventMap = {
  [K in keyof HTMLElementEventMap]?: {
    handler: EventHandler;
    selector?: string;
  };
};

export interface User {
  firstName: string;
  secondName: string;
  avatar: string;
  email: string;
  login: string;
  phone: string;
}

export interface LastMessage {
  user: User;
  time: string;
  content: string;
}

export interface ChatItemProps extends AdditionalField {
  id: number;
  name: string;
  time?: string;
  className?: string;
  unreadCount?: number;
  events?: EventMap;
  avatar: string | null;
  createdBy: number;
  lastMessage: LastMessage | null;
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

export type ModalOpen = 'add' | 'delete' | 'avatar' | 'delete-chat' | null;

export interface ModalLabels {
  openMenu: string;
  addUser: string;
  deleteUser: string;
  addAvatar: string;
  deleteChat: string;
}

export interface ModalIcons {
  menu: IconSpec;
  addBg: IconSpec;
  addCross: IconSpec;
  deleteBg: IconSpec;
  deleteCross: IconSpec;
  addAvatar: IconSpec;
  deleteChat: IconSpec;
}

export interface ChatMenuProps extends BlockBasics<AdditionalField> {
  chat?: ChatItemProps;
  menuOpened?: boolean;
  avatar?: string | null;
  modalOpen: ModalOpen;
  labels?: ModalLabels;
  icons?: ModalIcons;
  toggleMenu?: () => void;
}

export type Colors = 'red' | 'blue' | 'white';
export type ButtonVariants = 'primary' | 'link' | 'icon';
export type ButtonTypes = 'button' | 'submit' | 'reset';

export interface CustomButtonProps extends BlockBasics<AdditionalField> {
  text: string | null;
  color?: Colors;
  variant?: ButtonVariants;
  onClick?: (e: Event) => void;
  type?: ButtonTypes;
  icon?: IconSpec;
  path?: Path;
}

export interface CustomFormProps extends BlockBasics<AdditionalField> {
  title: string;
  customButton: CustomButtonProps;
  inputFields: InputItemProps[];
  customLink?: CustomLinkProps;
}

export interface CustomLinkProps extends BlockBasics<AdditionalField> {
  text: string;
  href: string;
}

export type InputItemVariants = 'regular' | 'quill';

export interface InputItemProps extends BlockBasics<AdditionalField> {
  value: string | null;
  title: string | null;
  type: string;
  placeholder: string;
  error: string | null;
  name: string;
  variant: InputItemVariants;
}

export interface MessageListProps extends BlockBasics<AdditionalField> {
  messageList: MessageItemProps[];
}

export interface FileProps {
  id: number;
  userId: number;
  path: string;
  filename: string;
  contentType: string;
  contentSize: number;
  uploadDate: string;
}

export interface MessageItemProps extends BlockBasics<AdditionalField> {
  id: number;
  text: string;
  isOwn?: boolean;
  time: string;
  file?: FileProps;
  type: string;
}

export interface MessageQuillLabels {
  attach?: string;
  photoVideo?: string;
  file?: string;
  location?: string;
  send?: string;
}

export interface MessageQuillProps extends BlockBasics<AdditionalField> {
  inputItem: InputItemProps;
  showAttachmentMenu?: boolean;
  imgIcon?: IconSpec;
  fileIcon?: IconSpec;
  locationIcon?: IconSpec;
  attachButton: CustomButtonProps;
  sendButton: CustomButtonProps;
  labels?: MessageQuillLabels;
}

export type ModalItemVariants = 'avatar' | 'input' | 'yesNo';

export interface ModalItemProps extends BlockBasics<AdditionalField> {
  type: ModalItemVariants;
  isAvatar?: boolean;
  isInput?: boolean;
  method: string;
  action: string;
  title: string;
  submitText: string;
  isOpen?: boolean;
  inputId: string;
  inputName: string;
  labelText: string;
  onSubmit?: (e: Event) => void;
}

export type FieldType = 'text' | 'email' | 'password' | 'tel';

export interface Field {
  name: string;
  label: string;
  value?: string;
  placeholder?: string;
  type?: FieldType;
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
  onSubmit?: (e: Event) => void;
}

export type FormEditingState = 'view' | 'credentials' | 'pass';

export interface ProfileInfoProps extends BlockBasics<AdditionalField> {
  className?: string;
  menuOpened?: boolean;
  name: string;
  avatar?: AvatarCfg;
  infoFields: InfoFieldProps[];
  modalItem?: ModalItemProps;
  query: {
    editing: FormEditingState;
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
