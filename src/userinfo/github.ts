import SocialUserInfo from './default';

export default class GitHubUserInfo extends SocialUserInfo {
  constructor(userInfo: any) {
    super({
      name: userInfo.name,
      email: userInfo.email,
      profileImage: userInfo.avatar_url,
      socialId: userInfo.id,
      socialType: 'github',
    });
  }
}
