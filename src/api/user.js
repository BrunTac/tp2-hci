import { Api } from './api.js';

export { UserApi, User }

class UserApi {
  static getUrl (slug) {
    return `${Api.baseUrl}/user${ slug ? `/${slug}` : ''}`;
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
  static async register (credentials, controller) {
    return await Api.post(UserApi.getUrl(''), false, credentials, controller);
  }
  static async verify (code) {
    return await Api.post(UserApi.getUrl(`verify?code=${code}`), false);
  }
  static async resendVerification (controller) {
    return await Api.post(UserApi.getUrl('resend-verification'), false, controller);
  }
}

class User {
  constructor (firstName, lastName, birthDate, email, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.email = email;
    this.password = password;
  }
}
