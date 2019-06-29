export const API_URL = 'https://api.unsplash.com'
export const API_VERSION = 'v1'
export const OAUTH_AUTHORIZE_URL = 'https://unsplash.com/oauth/authorize'
export const OAUTH_TOKEN_URL = 'https://unsplash.com/oauth/token'
export const CLIENT_ID =
  '827bfc1d3e5daf6c9f56fa7a336a586efbf8d7a4ccbe2f34e45ca9b34732583d'
export const CLIENT_SECRET =
  '3b6160cf82d13e7bafbd6672a3736e4c6c3cf34273220525cfeeac9e2ee2d100'
export const CALLBACK_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://mahmoodbawazir.github.io/react-unsplash-with-oauth/'
export const SCOPE = [
  'public',
  'read_user',
  'write_user',
  'read_photos',
  'write_photos',
  'write_likes',
  'write_followers',
  'read_collections',
  'write_collections'
]
