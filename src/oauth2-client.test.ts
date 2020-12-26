import OAuth2Client from './oauth2-client';
import UserInfoFactory from './userinfo/factory';

const mockAuthorizationCode = 'mock_authorization_code';
const mockState = 'mock_state';

test('Google authorizationUri 테스트', () => {
  //given
  const client = new OAuth2Client('google');

  //when
  const authorizationUri = client.getAuthorizationUri(mockState);
  const { searchParams } = new URL(authorizationUri);

  //then
  expect(
    authorizationUri.startsWith('https://accounts.google.com/o/oauth2/v2/auth'),
  ).toBe(true);
  expect(searchParams.get('response_type')).toBe('code');
  expect(searchParams.get('state')).toBe(mockState);
  expect(searchParams.get('access_type')).toBe('offline');
  expect(searchParams.get('client_id')).not.toBeNull();
  expect(searchParams.get('redirect_uri')).not.toBeNull();
  expect(searchParams.get('scope')).not.toBeNull();
});

test('Naver authorizationUri 테스트', () => {
  //given
  const client = new OAuth2Client('naver');

  //when
  const authorizationUri = client.getAuthorizationUri(mockState);
  const { searchParams } = new URL(authorizationUri);

  //then
  expect(
    authorizationUri.startsWith('https://nid.naver.com/oauth2.0/authorize'),
  ).toBe(true);
  expect(searchParams.get('response_type')).toBe('code');
  expect(searchParams.get('state')).toBe(mockState);
  expect(searchParams.get('client_id')).not.toBeNull();
  expect(searchParams.get('redirect_uri')).not.toBeNull();
  expect(searchParams.get('scope')).not.toBeNull();
});

test('Kakao authorizationUri 테스트', () => {
  //given
  const client = new OAuth2Client('kakao');

  //when
  const authorizationUri = client.getAuthorizationUri(mockState);
  const { searchParams } = new URL(authorizationUri);

  //then
  expect(
    authorizationUri.startsWith('https://kauth.kakao.com/oauth/authorize'),
  ).toBe(true);
  expect(searchParams.get('response_type')).toBe('code');
  expect(searchParams.get('state')).toBe(mockState);
  expect(searchParams.get('client_id')).not.toBeNull();
  expect(searchParams.get('redirect_uri')).not.toBeNull();
  expect(searchParams.get('scope')).not.toBeNull();
});

test('GitHub authorizationUri 테스트', () => {
  //given
  const client = new OAuth2Client('github');

  //when
  const authorizationUri = client.getAuthorizationUri(mockState);
  const { searchParams } = new URL(authorizationUri);

  //then
  expect(
    authorizationUri.startsWith('https://github.com/login/oauth/authorize'),
  ).toBe(true);
  expect(searchParams.get('response_type')).toBe('code');
  expect(searchParams.get('state')).toBe(mockState);
  expect(searchParams.get('client_id')).not.toBeNull();
  expect(searchParams.get('redirect_uri')).not.toBeNull();
  expect(searchParams.get('scope')).not.toBeNull();
});

test('Google authorization 응답값 테스트', async () => {
  //given
  const provider = 'google';
  const mockTokenResponse = {
    accessToken: '1/fFAGRNJru1FTz70BzhT3Zg',
    expiresIn: 3920,
    tokenType: 'Bearer',
    scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
    refreshToken: '1//xEoDL4iW3cxlI7yDbSRFYNG01kVKM2C-259HOF2aQbI',
    refreshTokenExpiresIn: undefined,
  };

  const mockUserInfoResponse = {
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

  const mockGetAccessTokenFunc = jest.spyOn(
    OAuth2Client.prototype as any,
    'getAccessToken',
  );

  const mockGetUserInfoFunc = jest.spyOn(
    OAuth2Client.prototype as any,
    'getUserInfo',
  );

  mockGetAccessTokenFunc.mockImplementation((code, state) =>
    Promise.resolve(mockTokenResponse),
  );

  mockGetUserInfoFunc.mockImplementation((accessToken) =>
    Promise.resolve(
      UserInfoFactory.parseUserInfo(provider, mockUserInfoResponse),
    ),
  );

  //when
  const client = new OAuth2Client(provider);
  const { token, profile } = await client.authorize(
    mockAuthorizationCode,
    mockState,
  );

  //then
  expect(token).toBe(mockTokenResponse);
  expect(profile.socialId).toBe(mockUserInfoResponse.sub);
  expect(profile.socialType).toBe(provider);
  expect(profile.name).toBe(mockUserInfoResponse.name);
  expect(profile.email).toBe(mockUserInfoResponse.email);
  expect(profile.profileImage).toBe(mockUserInfoResponse.picture);
});

test('Naver authorization 응답값 테스트', async () => {
  //given
  const provider = 'naver';
  const mockTokenResponse = {
    accessToken:
      'AAAAQosjWDJieBiQZc3to9YQp6HDLvrmyKC+6+iZ3gq7qrkqf50ljZC+Lgoqrg',
    refreshToken:
      'c8ceMEJisO4Se7uGisHoX0f5JEii7JnipglQipkOn5Zp3tyP7dHQoP0zNKHUq2gY',
    tokenType: 'bearer',
    expiresIn: '3600',
    scope: undefined,
    refreshTokenExpiresIn: undefined,
  };

  const mockUserInfoResponse = {
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

  const mockGetAccessTokenFunc = jest.spyOn(
    OAuth2Client.prototype as any,
    'getAccessToken',
  );
  const mockGetUserInfoFunc = jest.spyOn(
    OAuth2Client.prototype as any,
    'getUserInfo',
  );

  mockGetAccessTokenFunc.mockImplementation((code, state) =>
    Promise.resolve(mockTokenResponse),
  );

  mockGetUserInfoFunc.mockImplementation((accessToken) =>
    Promise.resolve(
      UserInfoFactory.parseUserInfo(provider, mockUserInfoResponse),
    ),
  );

  //when
  const client = new OAuth2Client(provider);
  const { token, profile } = await client.authorize(
    mockAuthorizationCode,
    mockState,
  );

  //then
  expect(token).toBe(mockTokenResponse);
  expect(profile.socialId).toBe(mockUserInfoResponse.response.id);
  expect(profile.socialType).toBe(provider);
  expect(profile.name).toBe(mockUserInfoResponse.response.name);
  expect(profile.email).toBe(mockUserInfoResponse.response.email);
  expect(profile.profileImage).toBe(
    mockUserInfoResponse.response.profile_image,
  );
});

test('Kakao authorization 응답값 테스트', async () => {
  //given
  const provider = 'kakao';
  const mockTokenResponse = {
    token_type: 'bearer',
    access_token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    expires_in: 43199,
    refresh_token: 'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',
    refresh_token_expires_in: 25184000,
    scope: 'account_email profile',
  };

  const mockUserInfoResponse = {
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

  const mockGetAccessTokenFunc = jest.spyOn(
    OAuth2Client.prototype as any,
    'getAccessToken',
  );
  const mockGetUserInfoFunc = jest.spyOn(
    OAuth2Client.prototype as any,
    'getUserInfo',
  );

  mockGetAccessTokenFunc.mockImplementation((code, state) =>
    Promise.resolve(mockTokenResponse),
  );

  mockGetUserInfoFunc.mockImplementation((accessToken) =>
    Promise.resolve(
      UserInfoFactory.parseUserInfo(provider, mockUserInfoResponse),
    ),
  );

  //when
  const client = new OAuth2Client(provider);
  const { token, profile } = await client.authorize(
    mockAuthorizationCode,
    mockState,
  );

  //then
  expect(token).toBe(mockTokenResponse);
  expect(profile.socialId).toBe(mockUserInfoResponse.id);
  expect(profile.socialType).toBe(provider);
  expect(profile.name).toBe(mockUserInfoResponse.properties.nickname);
  expect(profile.email).toBe(mockUserInfoResponse.kakao_account.email);
  expect(profile.profileImage).toBe(
    mockUserInfoResponse.properties.profile_image,
  );
});

test('GitHub authorization 응답값 테스트', async () => {
  //given
  const provider = 'github';
  const mockTokenResponse = {
    accessToken: 'e72e16c7e42f292c6912e7710c838347ae178b4a',
    scope: 'repo,gist',
    tokenType: 'bearer',
    expiresIn: undefined,
    refreshToken: undefined,
    refreshTokenExpiresIn: undefined,
  };

  const mockUserInfoResponse = {
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

  const mockGetAccessTokenFunc = jest.spyOn(
    OAuth2Client.prototype as any,
    'getAccessToken',
  );
  const mockGetUserInfoFunc = jest.spyOn(
    OAuth2Client.prototype as any,
    'getUserInfo',
  );

  mockGetAccessTokenFunc.mockImplementation((code, state) =>
    Promise.resolve(mockTokenResponse),
  );

  mockGetUserInfoFunc.mockImplementation((accessToken) =>
    Promise.resolve(
      UserInfoFactory.parseUserInfo(provider, mockUserInfoResponse),
    ),
  );

  //when
  const client = new OAuth2Client(provider);
  const { token, profile } = await client.authorize(
    mockAuthorizationCode,
    mockState,
  );

  //then
  expect(token).toBe(mockTokenResponse);
  expect(profile.socialId).toBe(mockUserInfoResponse.id);
  expect(profile.socialType).toBe(provider);
  expect(profile.name).toBe(mockUserInfoResponse.name);
  expect(profile.email).toBe(mockUserInfoResponse.email);
  expect(profile.profileImage).toBe(mockUserInfoResponse.avatar_url);
});
