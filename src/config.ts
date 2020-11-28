const OAuthConfig = {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || 'clientID',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'clientSecret',
    scope:
      process.env.GOOGLE_OAUTH_SCOPE ||
      'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    authorizationUri:
      process.env.GOOGLE_AUTHORIZATION_URI ||
      'https://accounts.google.com/o/oauth2/v2/auth',
    callbackUri:
      process.env.GOOGLE_CALLBACK_URI ||
      'http://localhost:4000/api/auth/callback/google',
    tokenUri:
      process.env.GOOGLE_TOKEN_URI || 'https://oauth2.googleapis.com/token',
    userInfoUri:
      process.env.GOOGLE_USERINFO_URI ||
      'https://openidconnect.googleapis.com/v1/userinfo',
  },
  naver: {
    clientId: process.env.NAVER_CLIENT_ID || 'clientID',
    clientSecret: process.env.NAVER_CLIENT_SECRET || 'clientSecret',
    scope: process.env.NAVER_OAUTH_SCOPE || 'profile',
    authorizationUri:
      process.env.NAVER_AUTHORIZATION_URI ||
      'https://nid.naver.com/oauth2.0/authorize',
    callbackUri:
      process.env.NAVER_CALLBACK_URI ||
      'http://localhost:4000/api/auth/callback/naver',
    tokenUri:
      process.env.NAVER_TOKEN_URI || 'https://nid.naver.com/oauth2.0/token',
    userInfoUri:
      process.env.NAVER_USERINFO_URI || 'https://openapi.naver.com/v1/nid/me',
  },
  kakao: {
    clientId: process.env.KAKAO_CLIENT_ID || 'clientID',
    clientSecret: process.env.KAKAO_CLIENT_SECRET || 'clientSecret',
    scope: process.env.KAKAO_OAUTH_SCOPE || 'profile account_email',
    authorizationUri:
      process.env.KAKAO_AUTHORIZATION_URI ||
      'https://kauth.kakao.com/oauth/authorize',
    callbackUri:
      process.env.KAKAO_CALLBACK_URI ||
      'http://localhost:4000/api/auth/callback/kakao',
    tokenUri:
      process.env.KAKAO_TOKEN_URI || 'https://kauth.kakao.com/oauth/token',
    userInfoUri:
      process.env.KAKAO_USERINFO_URI || 'https://kapi.kakao.com/v2/user/me',
  },
};

export default OAuthConfig;
