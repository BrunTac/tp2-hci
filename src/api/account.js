import { Api } from './api.js';

export { AccountApi, Account };

class AccountApi {
  static getUrl (slug) {
    return `${Api.baseUrl}/account${slug ? `/${slug}` : ''}`;
  }

  static async get (controller) {
    return Api.get(AccountApi.getUrl(), true, controller);
  }

  static async updateAlias (alias) {
    return await Api.put(AccountApi.getUrl(`update-alias?alias=${alias}`), true, account);
  }

  static async recharge (amount) {
    return await Api.post(AccountApi.getUrl(`recharge?amount=${amount}`), true);
  }

  static async verifyCVU (cvu) {
    return await Api.get(AccountApi.getUrl(`verify-cvu?cvu=${cvu}`), true);
  }

  static async verifyAlias (alias) {
    return await Api.get(AccountApi.getUrl(`verify-alias?alias=${alias}`), true);
  }

}

class Account {
  constructor (id, balance, invested, cvu, alias) {
    this.id = id;
    this.balance = balance;
    this.invested = invested;
    this.cvu = cvu;
    this.alias = alias;
  }
}
