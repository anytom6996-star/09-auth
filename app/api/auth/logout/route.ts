import { NextResponse } from 'next/server';

const API_URL = 'https://notehub-public.goit.study/api';

export async function POST(request: Request) {
  try {
    const token = request.headers.get('authorization');

    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: token
        ? {
            Authorization: token,
          }
        : {},
    });

    const nextResponse = NextResponse.json(
      { success: true },
      { status: response.ok ? 200 : response.status },
    );

    nextResponse.cookies.delete('session_token');

    return nextResponse;
  } catch {
    const nextResponse = NextResponse.json({ success: true });

    nextResponse.cookies.delete('session_token');

    return nextResponse;
  }
}