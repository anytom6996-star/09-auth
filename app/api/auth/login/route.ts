import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';

import { api } from '@/app/api/api';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await api.post('/auth/login', body);

    const setCookie = response.headers['set-cookie'];

    if (setCookie) {
      const cookieStore = await cookies();

      setCookie.forEach(cookie => {
        const [nameValue, ...attributes] = cookie.split('; ');
        const [name, ...valueParts] = nameValue.split('=');

        cookieStore.set({
          name,
          value: valueParts.join('='),
          ...Object.fromEntries(
            attributes.map(attribute => {
              const [key, ...value] = attribute.split('=');

              return [
                key.toLowerCase(),
                value.length ? value.join('=') : true,
              ];
            }),
          ),
        });
      });
    }

    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data ?? {
          message: 'Login failed',
        },
        {
          status: error.response?.status ?? 500,
        },
      );
    }

    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 },
    );
  }
}