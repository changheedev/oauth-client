# OAuth2 Client

OAuth2 Client is a library for the OAuth 2.0 authorization.

## Supported Provider

- Google
- GitHub
- Naver
- Kakao

## Usage

### Install

Install library using npm:

```
npm install --save @changheedev/oauth2-client dotenv
```

### Set environment variables

Create a `.env` file in the root directory of your project. Add properties of OAuth2 services to use. Enter a supported provider in uppercase instead of XXX.

```
XXX_CLIENT_ID=<YOUR_CLIENT_ID>
XXX_CLIENT_SECRET=<YOUR_CLIENT_SECRET>
XXX_CALLBACK_URI=<YOUR_CALLBACK_URI>
```

**Optional**

- **XXX_OAUTH_SCOPE**

  - A **space-delimited** list of scopes that identify the resources that your application could access on the user's behalf.
  - Default scope is user's profile.

- If the endpoint does not work, you can set it yourself.

  - **XXX_AUTHORIZATION_URI**
  - **XXX_TOKEN_URI**
  - **XXX_USERINFO_URI**

## Example

**express.js**

```javascript
require('dotenv').config(); //As early as possible in your application
const express = require('express');
const { OAuth2Client } = require('@changheedev/oauth2-client');

const router = express.Router();

router.get('/oauth2/authorize/:provider', (req, res) => {
  const { provider } = req.params;
  const oAuthClient = new OAuth2Client(provider);
  const state = 'random-unique-string';
  const authorizationUri = oAuthClient.getAuthorizationUri(state);
  res.redirect(authorizationUri);
});

router.get('/oauth2/callback/:provider', (req, res) => {
  const { provider } = req.params;
  const { code, state, error } = req.query;

  const oAuthClient = new OAuth2Client(provider);
  oAuthClient.authorize(code, state).then(({ token, profile }) => {
    //do something
  });
});
```

**koa.js**

```javascript
require('dotenv').config(); //As early as possible in your application
const Router = require('koa-router');
const { OAuth2Client } = require('@changheedev/oauth2-client');

const router = new Router();

router.get('/oauth2/authorize/:provider', (ctx) => {
  const { provider } = ctx.params;
  const oAuthClient = new OAuth2Client(provider);
  const state = 'random-unique-string';
  const authorizationUri = oAuthClient.getAuthorizationUri(state);
  ctx.redirect(authorizationUri);
});

router.get('/oauth2/callback/:provider', (ctx) => {
  const { provider } = ctx.params;
  const { code, state, error } = ctx.request.query;

  const oAuthClient = new OAuth2Client(provider);
  oAuthClient.authorize(code, state).then(({ token, profile }) => {
    //do something
  });
});
```
