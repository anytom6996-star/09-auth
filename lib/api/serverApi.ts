import axios from 'axios';

import { cookies } from 'next/headers';

const API_URL = 'https://notehub-public.goit.study/api';

export async function serverApi() {
  const cookieStore = await cookies();

  const token = cookieStore.get('accessToken')?.value;

  return axios.create({
    baseURL: API_URL,
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  });
}