const CLIENT_ID =
  '1010611727033-t5uiv067a9db9j900i9lnpqi3jncmtlt.apps.googleusercontent.com';
const { OAuth2Client } = require('google-auth-library');
const loginClient = new OAuth2Client(CLIENT_ID);
module.exports = { loginClient };
