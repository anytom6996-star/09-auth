import { NextResponse } from 'next/server';

const API_URL = 'https://notehub-public.goit.study/api';

function getAuthorization(request: Request) {
  return request.headers.get('authorization');
}

export async function GET(request: Request) {
  try {
    const authorization = getAuthorization(request);

    if (!authorization) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 },
      );
    }

    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        Authorization: authorization,
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

export async function PATCH(request: Request) {
  try {
    const authorization = getAuthorization(request);
    const body = await request.json();

    if (!authorization) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 },
      );
    }

    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization,
      },
      body: JSON.stringify(body),
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