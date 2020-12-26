import SocialUserInfo from './userinfo/default';

export type OAuthProvider = 'google' | 'naver' | 'kakao' | 'github';

export type OAuthTokenResponse = {
  tokenType: string;
  accessToken: string;
  expiresIn?: number;
  refreshToken?: string;
  refreshTokenExpiresIn?: number;
  scope?: string;
};

export type OAuthAuthorizationResponse = {
  token: OAuthTokenResponse;
  profile: SocialUserInfo;
};
