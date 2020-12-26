import UserInfoFactory from './factory';

test('Google userinfo parsing test', () => {
  const response = {
    sub: 1234567890,
    iss: 'https://accounts.google.com',
    aud: '123-abc.apps.googleusercontent.com',
    iat: 233366400,
    exp: 233370000,
    name: 'Jan Jansen',
    given_name: 'Jan',
    family_name: 'Jansen',
    email: 'jan@gmail.com',
    locale: 'en_US',
    picture:
      '<https://lh3.googleusercontent.com/a-/AOh14Gg3ldCgf-HDZFU7tvWtb9fa-0GsK7bkAgSsZX-hzw>',
  };

  const userinfo = UserInfoFactory.parseUserInfo('google', response);
  expect(userinfo.socialId).toBe(response.sub);
  expect(userinfo.socialType).toBe('google');
  expect(userinfo.name).toBe(response.name);
  expect(userinfo.email).toBe(response.email);
  expect(userinfo.profileImage).toBe(response.picture);
});

test('Kakao userinfo parsing test', () => {
  const response = {
    id: 123456789,
    kakao_account: {
      profile_needs_agreement: false,
      profile: {
        nickname: '홍길동',
        thumbnail_image_url: 'http://yyy.kakao.com/.../img_110x110.jpg',
        profile_image_url: 'http://yyy.kakao.com/dn/.../img_640x640.jpg',
      },
      email_needs_agreement: false,
      is_email_valid: true,
      is_email_verified: true,
      email: 'xxxxxxx@xxxxx.com',
      age_range_needs_agreement: false,
      age_range: '20~29',
      birthday_needs_agreement: false,
      birthday: '1130',
      gender_needs_agreement: false,
      gender: 'female',
    },
    properties: {
      nickname: '홍길동카톡',
      thumbnail_image: 'http://xxx.kakao.co.kr/.../aaa.jpg',
      profile_image: 'http://xxx.kakao.co.kr/.../bbb.jpg',
    },
  };

  const userinfo = UserInfoFactory.parseUserInfo('kakao', response);
  expect(userinfo.socialId).toBe(response.id);
  expect(userinfo.socialType).toBe('kakao');
  expect(userinfo.name).toBe(response.properties.nickname);
  expect(userinfo.email).toBe(response.kakao_account.email);
  expect(userinfo.profileImage).toBe(response.properties.profile_image);
});

test('Naver userinfo parsing test', () => {
  const response = {
    resultcode: '00',
    message: 'success',
    response: {
      email: 'openapi@naver.com',
      nickname: 'OpenAPI',
      profile_image:
        'https://ssl.pstatic.net/static/pwe/address/nodata_33x33.gif',
      age: '40-49',
      gender: 'F',
      id: '32742776',
      name: '오픈 API',
      birthday: '10-01',
    },
  };

  const userinfo = UserInfoFactory.parseUserInfo('naver', response);
  expect(userinfo.socialId).toBe(response.response.id);
  expect(userinfo.socialType).toBe('naver');
  expect(userinfo.name).toBe(response.response.name);
  expect(userinfo.email).toBe(response.response.email);
  expect(userinfo.profileImage).toBe(response.response.profile_image);
});

test('GitHub userinfo parsing test', () => {
  const response = {
    login: 'octocat',
    id: 1,
    node_id: 'MDQ6VXNlcjE=',
    avatar_url: 'https://github.com/images/error/octocat_happy.gif',
    gravatar_id: '',
    url: 'https://api.github.com/users/octocat',
    html_url: 'https://github.com/octocat',
    followers_url: 'https://api.github.com/users/octocat/followers',
    following_url:
      'https://api.github.com/users/octocat/following{/other_user}',
    gists_url: 'https://api.github.com/users/octocat/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/octocat/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/octocat/subscriptions',
    organizations_url: 'https://api.github.com/users/octocat/orgs',
    repos_url: 'https://api.github.com/users/octocat/repos',
    events_url: 'https://api.github.com/users/octocat/events{/privacy}',
    received_events_url: 'https://api.github.com/users/octocat/received_events',
    type: 'User',
    site_admin: false,
    name: 'monalisa octocat',
    company: 'GitHub',
    blog: 'https://github.com/blog',
    location: 'San Francisco',
    email: 'octocat@github.com',
    hireable: false,
    bio: 'There once was...',
    twitter_username: 'monatheoctocat',
    public_repos: 2,
    public_gists: 1,
    followers: 20,
    following: 0,
    created_at: '2008-01-14T04:33:35Z',
    updated_at: '2008-01-14T04:33:35Z',
    private_gists: 81,
    total_private_repos: 100,
    owned_private_repos: 100,
    disk_usage: 10000,
    collaborators: 8,
    two_factor_authentication: true,
    plan: {
      name: 'Medium',
      space: 400,
      private_repos: 20,
      collaborators: 0,
    },
  };

  const userinfo = UserInfoFactory.parseUserInfo('github', response);
  expect(userinfo.socialId).toBe(response.id);
  expect(userinfo.socialType).toBe('github');
  expect(userinfo.name).toBe(response.name);
  expect(userinfo.email).toBe(response.email);
  expect(userinfo.profileImage).toBe(response.avatar_url);
});
