import { initClient } from '@ts-rest/core';
import { contract } from '@inno/api-contracts';
import { supabase } from '../supabase/client';

export const api = initClient(contract, {
  baseUrl: process.env['EXPO_PUBLIC_BACKEND_URL'] ?? 'http://localhost:8080',
  baseHeaders: {},
  api: async ({ path, method, headers, body }) => {
    const { data: { session } } = await supabase.auth.getSession();
    const mergedHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };
    if (session?.access_token) {
      mergedHeaders['Authorization'] = `Bearer ${session.access_token}`;
    }
    const response = await fetch(path, {
      method,
      headers: mergedHeaders,
      body: (body as string | undefined) ?? undefined,
    });
    const responseBody = await response.json().catch(() => null);
    return { status: response.status, body: responseBody, headers: response.headers };
  },
});
