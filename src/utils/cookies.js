const TOKEN_COOKIE_NAME = 'auth-token';
const COOKIE_EXPIRY_DAYS = 7;

export function setAuthToken(token) {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS);
  document.cookie = `${TOKEN_COOKIE_NAME}=${token};expires=${expiryDate.toUTCString()};path=/`;
}

export function getAuthToken() {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === TOKEN_COOKIE_NAME) {
      return value;
    }
  }
  return null;
}

export function removeAuthToken() {
  document.cookie = `${TOKEN_COOKIE_NAME}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}
