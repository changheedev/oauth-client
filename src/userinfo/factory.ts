import GoogleUserInfo from './google';
import NaverUserInfo from './naver';
import KakaoUserInfo from './kakao';
import SocialUserInfo from './default';

const parseUserInfo = (provider: string, userInfo: any): SocialUserInfo => {
  if (provider === 'google') {
    return new GoogleUserInfo(userInfo);
  }
  if (provider === 'naver') {
    return new NaverUserInfo(userInfo);
  }
  return new KakaoUserInfo(userInfo);
};

export default { parseUserInfo };
