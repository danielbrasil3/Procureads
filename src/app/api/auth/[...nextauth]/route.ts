import { handlers } from '@/auth';

// Referring to the auth.ts we just created
export const { GET, POST } = handlers;

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Add proper error handling
export async function handleError(error: unknown) {
  console.error('Auth route error:', error);
  return new Response('Internal Server Error', { status: 500 });
}