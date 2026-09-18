import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';

import { api } from '@/app/api/api';

export async function GET() {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join('; ');

    const response = await api.get('/auth/session', {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data ?? {
          message: 'Session check failed',
        },
        {
          status: error.response?.status ?? 401,
        },
      );
    }

    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 },
    );
  }
}