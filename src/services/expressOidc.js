const { auth } = require('express-openid-connect');
const config = require("../config");

const expressOidcConfig = {
  appSession: false,
  routes: false,
  required: true,
  auth0Logout: true,
  baseURL: 'https://localhost:4000',
  clientID: config.EXPRESS_OIDC_CLIENT_ID,
  clientSecret: config.EXPRESS_OIDC_CLIENT_SECRET,
  issuerBaseURL: config.EXPRESS_OIDC_ISSUER_BASEURL,
  redirectUriPath: '/auth/callback',
  loginPath: '/auth/login',
  logoutPath: '/auth/logout',
  authorizationParams: {
    response_type: "code",
    scope: "openid profile admin",
    audience: "https://localhost:4000"
  },
  handleCallback: async function (req, res, next) {
    // This will store the user identity claims in the session.
    // req.session.userIdentity = req.openidTokens.claims();
    req.session.userIdentity = req.openidTokens.claims();
    next();
  },
  getUser: async function (req) {
    return req.session.userIdentity;
  },
};

module.exports = auth(expressOidcConfig);