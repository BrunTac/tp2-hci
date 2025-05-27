import { Api } from './api'

export { PaymentApi, Payment }

class PaymentApi {
  static getUrl (slug) {
    return `${Api.baseUrl}/payment${slug ? `/${slug}` : ''}`;
  }
  static async generatePendingPayment (payment, controller) {
    return await Api.post(PaymentApi.getUrl('pull'), true, payment, controller);
  }
  static async processPendingPayment (payment, controller) {
    return await Api.put(PaymentApi.getUrl('push?uuid'), true, payment, controller);
  }
  static async emailTransfer (payment, controller) {
    return await Api.delete(PaymentApi.getUrl('transfer-email'), true, controller);
  }
  static async cvuTransfer (payment, controller) {
    return await Api.delete(PaymentApi.getUrl('transfer-cvu'), true, controller);
  }
  static async aliasTransfer (payment, controller) {
    return await Api.delete(PaymentApi.getUrl('transfer-alias'), true, controller);
  }
  static async get (id, controller) {
    return await Api.get(PaymentApi.getUrl(id), true, controller);
  }
  static async getAll (controller) {
    return await Api.get(PaymentApi.getUrl(), true, controller);
  }
}

class Payment {
  constructor (id, from, to, amount, description, date, hour) {
    if (id) {
      this.id = id;
    }
    this.from = from;
    this.to = to;
    this.amount = amount;
    this.description = description;
    this.date = date;
    this.hour = hour;
  }
}
