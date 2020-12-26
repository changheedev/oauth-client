import GoogleUserInfo from './google';
import NaverUserInfo from './naver';
import KakaoUserInfo from './kakao';
import GitHubUserInfo from './github';
import SocialUserInfo from './default';
import { OAuthProvider } from '../types';

const parseUserInfo = (
  provider: OAuthProvider,
  userInfo: any,
): SocialUserInfo => {
  if (provider === 'google') {
    return new GoogleUserInfo(userInfo);
  }
  if (provider === 'naver') {
    return new NaverUserInfo(userInfo);
  }
  if (provider === 'kakao') {
    return new KakaoUserInfo(userInfo);
  }
  return new GitHubUserInfo(userInfo);
};

export default { parseUserInfo };
