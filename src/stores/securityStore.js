import { computed, ref } from 'vue'
import { defineStore } from 'pinia';
import { UserApi } from '@/api/user';
import { Api } from '@/api/api';
import { setAuthToken, getAuthToken, removeAuthToken } from '@/utils/cookies';

export const useSecurityStore = defineStore('security', () => {
  const token = ref(null);
  const user = ref(null);

  const isLoggedIn = computed(() => {
    return token.value != null;
  });

  function initialize () {
    const cookieToken = getAuthToken();
    if (cookieToken) {
      setToken(cookieToken);
    }
  }

  function setUser (value) {
    user.value = value;
  }

  function setToken (value) {
    token.value = value;
    Api.token = value;
  }

  function updateToken (value, rememberMe) {
    if (rememberMe) {
      setAuthToken(value);
    }
    setToken(value);
  }

  function removeToken () {
    removeAuthToken();
    setToken(null);
  }

  async function login (credentials, rememberMe) {
    const result = await UserApi.login(credentials);
    updateToken(result.token, rememberMe);
  }

  async function logout () {
    try {
      await UserApi.logout();
    } finally {
      removeToken();
    }
  }

  async function getCurrentUser () {
    if (user.value) return user.value;
    const result = await UserApi.get();
    setUser(result);
  }

  return { user, isLoggedIn, initialize, login, logout, getCurrentUser };
});
