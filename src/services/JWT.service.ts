import { Secret, sign, verify } from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET as Secret;

/**
 * Sign object payload and generates a JWT string from it.
 *
 * @param payload An object to be signed
 * @returns A signed JWT string
 */
function signJWT(payload: Object) {
  const signedPayload = sign(payload, jwtSecret);
  return signedPayload;
}

/**
 * Checks if JWT is valid and if it is, return the decoded payload.
 *
 * @param token Signed JWT string
 * @returns Decoded payload
 */
function verifyJWT<PayloadType>(token: string): PayloadType {
  try {
    const verifiedToken = verify(token, jwtSecret);
    return verifiedToken as unknown as PayloadType;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export { signJWT, verifyJWT };
