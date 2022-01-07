import { Response } from 'express';

const MILISSECONDS_IN_A_WEEK = 1000 * 60 * 60 * 24 * 7;

/**
 * Sets a value on user's cookie
 *
 * @param response A valid `response` object
 * @param key The key used to identify the value
 * @param value Value of the key
 */
function setCookie(response: Response, key: string, value: string) {
  response.cookie(key, value, {
    maxAge: MILISSECONDS_IN_A_WEEK,
  });
}

/**
 * Removes a value from user's cookie
 *
 * @param response A valid `response` object
 * @param key The key to be removed from the cookie
 */
function deleteCookie(response: Response, key: string) {
  response.clearCookie(key);
}

export { setCookie, deleteCookie };
