import { NextResponse } from 'next/server';
import { isAxiosError } from 'axios';

import { api } from '@/app/api/api';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await api.post('/auth/register', body);

    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data ?? {
          message: 'Registration failed',
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