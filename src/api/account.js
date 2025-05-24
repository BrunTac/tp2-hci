import { Api } from './api.js';

export { AccountApi, Account }

class AccountApi {
  static getUrl (slug) {
    return `${Api.baseUrl}/account${ slug ? `/${slug}` : ''}`;
  }
  static async get (controller) {
    return Api.get(AccountApi.getUrl(), true, controller);
  }
  static async recharge (account, controller) {
    return Api.get(AccountApi.getUrl('recharge'), true, account, controller);
  }
  static async updateAlias (account, controller) {
    return Api.put(AccountApi.getUrl('update-alias'), true, account, controller);
  }
  static async verifyCvu (controller) {
    return Api.get(AccountApi.getUrl('verify-cvu'), true, controller);
  }
  static async verifyAlias (controller) {
    return Api.get(AccountApi.getUrl('verify-alias'), true, controller);
  }
}

class Account {
  constructor (id, firstName, lastName, balance, cvu, alias) {
    if (id) {
      this.id = id;
    }
    this.firstName = firstName;
    this.lastName = lastName;
    this.balance = balance;
    this.cvu = cvu;
    this.alias = alias;
  }
}
