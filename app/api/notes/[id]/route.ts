import { NextResponse } from 'next/server';

const API_URL = 'https://notehub-public.goit.study/api';

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

function getAuthorization(request: Request) {
  return request.headers.get('authorization');
}

export async function GET(
  request: Request,
  { params }: RouteContext,
) {
  try {
    const { id } = await params;
    const authorization = getAuthorization(request);

    const response = await fetch(`${API_URL}/notes/${id}`, {
      headers: authorization
        ? {
            Authorization: authorization,
          }
        : {},
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

export async function DELETE(
  request: Request,
  { params }: RouteContext,
) {
  try {
    const { id } = await params;
    const authorization = getAuthorization(request);

    if (!authorization) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 },
      );
    }

    const response = await fetch(`${API_URL}/notes/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: authorization,
      },
    });

    if (!response.ok) {
      const data = await response.json();

      return NextResponse.json(data, {
        status: response.status,
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 },
    );
  }
}