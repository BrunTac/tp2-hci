import { Api } from './api'

export { PaymentApi, Payment }

class PaymentApi {
  static getUrl (slug) {
    return `${Api.baseUrl}/payment${slug ? `/${slug}` : ''}`;
  }
  static async generatePendingPayment (description, amount, controller) {
    return await Api.post(PaymentApi.getUrl('pull'), true, { description, amount }, controller);
  }
  static async processPendingPayment (uuid, cardId, controller) {
    let url = `push?uuid=${uuid}`;
    if (cardId){
      url += `&cardId=${cardId}`;
    }
    return await Api.put(PaymentApi.getUrl(url), true, controller);
  }
  static async emailTransfer (email, cardId, description, amount, controller) {
    let url = `transfer-email?email=${email}`;
    if (cardId){
      url += `&cardId=${cardId}`;
    }
    return await Api.post(PaymentApi.getUrl(url), true, { description: description.value, amount: amount.value }, controller);
  }
  static async cvuTransfer (cvu, cardId, description, amount, controller) {
    let url = `transfer-cvu?cvu=${cvu}`;
    if (cardId){
      url += `&cardId=${cardId}`;
    }
    return await Api.post(PaymentApi.getUrl(url), true, { description: description.value, amount: amount.value }, controller);
  }
  static async aliasTransfer (alias, cardId, description, amount, controller) {
    let url = `transfer-alias?alias=${alias}`;
    if (cardId){
      url += `&cardId=${cardId}`;
    }
    return await Api.post(PaymentApi.getUrl(url), true, { description: description.value, amount: amount.value }, controller);
  }
  static async get (id,controller) {
    return await Api.get(PaymentApi.getUrl(id), true, controller);
  }
  static async getAll (page, direction, pending, method, range, role, cardId, controller){
    const params = [];

    if (page !== undefined) params.push(`page=${page}`);
    if (direction) params.push(`direction=${direction}`);
    if (pending !== undefined) params.push(`pending=${pending}`);
    if (method) params.push(`method=${method}`);
    if (range) params.push(`range=${range}`);
    if (role) params.push(`role=${role}`);
    if (cardId !== undefined) params.push(`cardId=${cardId}`);

    const queryString = params.length > 0 ? `?${params.join('&')}` : '';
    const url = `${Api.baseUrl}/payment${queryString}`;

    return await Api.get(url, true, controller);
  }
}

class Payment {
  constructor (id, payer, receiver, amount, description, date, hour, method, card) {
    if (id) {
      this.id = id;
    }
    this.receiver = receiver;
    this.payer = payer;
    this.amount = amount;
    this.description = description;
    this.method = method;
    this.card = card
  }
}
