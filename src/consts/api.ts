const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiRoutes = {
  SIGNUP: '/auth/signup',
  SIGNIN: '/auth/signin',
  LOGIN: '/auth/user',
  LOGOUT: '/auth/logout',

  CHANGE_PROFILE: '/user/profile',
  CHANGE_AVATAR: '/user/profile/avatar',
  CHANGE_PASSWORD: '/user/password',
  GET_USER: '/user/:id',
  FIND_USER: '/user/search',

  GET_CHATS: '/chats',
  GET_USERS: '/chats/:id/users',
  GET_NEW_CHAT: '/chats/new/:id',
  ADD_CHAT_AVATAR: '/chats/avatar',
  CHANGE_USERS: '/chats/users',
  DELETE_USERS: '/chats/users',
};

export { API_BASE_URL, apiRoutes };
