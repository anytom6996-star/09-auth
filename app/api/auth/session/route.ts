import { NextResponse } from 'next/server';

const API_URL = 'https://notehub-public.goit.study/api';

export async function GET(request: Request) {
  try {
    const token = request.headers.get('authorization');

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 },
      );
    }

    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        Authorization: token,
      },
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 },
    );
  }
}