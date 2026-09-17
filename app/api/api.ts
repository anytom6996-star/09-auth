export const API_URL = 'https://notehub-public.goit.study/api';

export function getAuthorization(request: Request) {
  return request.headers.get('authorization');
}