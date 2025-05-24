import { Api } from './api.js';

export { UserApi, Credentials }

class UserApi {
  static getUrl (slug) {
    return `${Api.baseUrl}/user${ slug ? `/${slug}` : ''}`;
  }
  static async register (user, controller) {
    return await Api.post(UserApi.getUrl(), false, user, controller);
  }
  static async resendVerification (user, controller) {
    return await Api.post(UserApi.getUrl('resend-verification'), false, user, controller);
  }
  static async verify (token, controller) {
    return await Api.get(UserApi.getUrl('verify'), false, { token }, controller);
  }
  static async resetPassword (user, controller) {
    return await Api.post(UserApi.getUrl('reset-password'), false, user, controller);
  }
  static async changePassword (user, controller) {
    return await Api.post(UserApi.getUrl('change-password'), false, user, controller);
  }
  static async login (credentials, controller) {
    return await Api.post(UserApi.getUrl('login'), false, credentials, controller);
  }
  static async logout (controller) {
    await Api.post(UserApi.getUrl('logout'), true, controller);
  }
  static async get (controller) {
    return Api.get(UserApi.getUrl(), true, controller);
  }
}

class Credentials {
  constructor (email, password) {
    this.email = email;
    this.password = password;
  }
}
