const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiRoutes = {
  SIGNUP: '/auth/signup',
  SIGNIN: '/auth/signin',
  USER: '/auth/user',
  LOGOUT: '/auth/logout',

  CHANGE_PROFILE: '/user/profile',
  CHANGE_AVATAR: '/user/profile/avatar',
  CHANGE_PASSWORD: '/user/password',
  GET_USER: '/user/:id',
  FIND_USER: '/user/search',

  CHATS: '/chats',
  CHATS_ARCHIVE: '/chats/archive',
  CHATS_UNARCHIVE: '/chats/unarchive',
  ADD_CHAT_AVATAR: '/chats/avatar',
  CHAT_USERS: '/chats/users',
  GET_TOKEN: '/chats/token',
};

export { API_BASE_URL, apiRoutes };
