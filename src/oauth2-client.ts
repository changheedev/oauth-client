import OAuthConfig from './config';
import axios from 'axios';
import UserInfoFactory from './userinfo/factory';
import SocialUserInfo from './userinfo/default';
import {
  OAuthProvider,
  OAuthTokenResponse,
  OAuthAuthorizationResponse,
} from './types';

export default class OAuth2Client {
  private config;

  private provider;

  constructor(provider: OAuthProvider) {
    this.provider = provider;
    this.config = OAuthConfig[provider];
  }

  public getAuthorizationUri(state: string): string {
    const { authorizationUri, clientId, callbackUri, scope } = this.config;
    const params = new URLSearchParams({
      client_id: clientId,
      response_type: 'code',
      redirect_uri: callbackUri,
      scope: scope,
      state,
    });

    if (this.provider === 'google') {
      params.set('access_type', 'offline');
    }
    return `${authorizationUri}?${params.toString()}`;
  }

  public async authorize(
    code: string,
    state: string,
  ): Promise<OAuthAuthorizationResponse> {
    const tokenResponse = await this.getAccessToken(code, state);
    const userInfo = await this.getUserInfo(tokenResponse.accessToken);
    return { token: tokenResponse, profile: userInfo };
  }

  private async getAccessToken(
    code: string,
    state: string,
  ): Promise<OAuthTokenResponse> {
    const { tokenUri, callbackUri, clientId, clientSecret } = this.config;
    const queryParams = new URLSearchParams({
      grant_type: 'authorization_code',
      redirect_uri: callbackUri,
      client_id: clientId,
      client_secret: clientSecret,
      code,
      state,
    });

    const header = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        accept: 'application/json',
        charset: 'utf-8',
      },
    };

    const { data } = await axios.post(tokenUri, queryParams.toString(), header);
    const tokenResponse = {
      tokenType: data.token_type,
      accessToken: data.access_token,
      expiresIn: data.expires_in,
      refreshToken: data.refresh_token,
      refreshTokenExpiresIn: data.refresh_token_expires_in,
      scope: data.scope,
    };
    return tokenResponse;
  }

  private async getUserInfo(accessToken: string): Promise<SocialUserInfo> {
    const { userInfoUri } = this.config;
    const { data } = await axios.get(userInfoUri, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userInfo = UserInfoFactory.parseUserInfo(this.provider, data);
    return userInfo;
  }
}
