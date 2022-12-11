const { OAuth2Client } = require('google-auth-library');
const loginClient = new OAuth2Client(process.env.CLIENT_ID);
module.exports = { loginClient };
