import { NextResponse } from 'next/server';

const API_URL = 'https://notehub-public.goit.study/api';

function getAuthorization(request: Request) {
  return request.headers.get('authorization');
}

export async function GET(request: Request) {
  try {
    const authorization = getAuthorization(request);
    const { searchParams } = new URL(request.url);

    const page = searchParams.get('page') ?? '1';
    const perPage = searchParams.get('perPage') ?? '12';
    const search = searchParams.get('search');
    const tag = searchParams.get('tag');

    const params = new URLSearchParams({
      page,
      perPage,
    });

    if (search) {
      params.set('search', search);
    }

    if (tag) {
      params.set('tag', tag);
    }

    const response = await fetch(
      `${API_URL}/notes?${params.toString()}`,
      {
        headers: authorization
          ? {
              Authorization: authorization,
            }
          : {},
      },
    );

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

export async function POST(request: Request) {
  try {
    const authorization = getAuthorization(request);

    if (!authorization) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 },
      );
    }

    const body = await request.json();

    const response = await fetch(`${API_URL}/notes`, {
      method: 'POST',
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
