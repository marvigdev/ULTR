type AUTH_ERRORS =
  | 'AUTH/INVALID_CREDENTIALS'
  | 'AUTH/USERNAME_ALREADY_EXISTS'
  | 'AUTH/PASSWORD_DOESNT_MATCH';

const AUTH_MESSAGES: {
  [error in AUTH_ERRORS]: string;
} = {
  'AUTH/INVALID_CREDENTIALS': 'Your credentials are invalid.',
  'AUTH/USERNAME_ALREADY_EXISTS':
    "There's already an account with this username.",
  'AUTH/PASSWORD_DOESNT_MATCH': 'Passwords do not match.',
};

function throwAuthError(error: AUTH_ERRORS) {
  throw new Error(AUTH_MESSAGES[error]);
}

export { throwAuthError };
