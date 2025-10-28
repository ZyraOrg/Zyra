import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

type ApiResponse = {
  user?: Record<string, unknown>;
  error?: string;
};

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
  console.warn('Supabase service role or URL not configured for signup endpoint');
}

const supabase = createClient(SUPABASE_URL ?? '', SUPABASE_SERVICE_ROLE ?? '');

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const body = req.body ?? {};
  const name = (body.name || '').toString().trim();
  const email = (body.email || '').toString().trim().toLowerCase();
  const password = (body.password || '').toString();
  const wallet_address = body.wallet_address ?? null;
  const profile_visibility = typeof body.profile_visibility === 'boolean' ? body.profile_visibility : true;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields: name, email, password' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
    return res.status(500).json({ error: 'Server misconfiguration: missing Supabase credentials' });
  }

  try {
    const { data: createData, error: createErr } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
    });

    if (createErr) {
      const msg = createErr.message || String(createErr);
      if (/duplicate|already exists|unique/i.test(msg) || (createErr as any)?.status === 409) {
        return res.status(409).json({ error: 'Email already in use' });
      }
      return res.status(400).json({ error: msg });
    }

    const userId = (createData as any)?.user?.id ?? (createData as any)?.id ?? null;

    const profile = {
      user_id: userId,
      name,
      email,
      wallet_address,
      profile_visibility,
    };

    const { data: insertData, error: insertErr } = await supabase.from('users').insert([profile]).select('*').single();

    if (insertErr) {
      try {
        if (userId) await supabase.auth.admin.deleteUser(userId);
      } catch (e) {
        console.error('Failed to rollback auth user after profile insert error', e);
      }
      const msg = insertErr.message || String(insertErr);
      if (/duplicate|unique|constraint/i.test(msg)) {
        return res.status(409).json({ error: 'Profile already exists or unique constraint violated' });
      }
      return res.status(500).json({ error: msg });
    }

    return res.status(201).json({ user: insertData as Record<string, unknown> });
  } catch (err: any) {
    console.error('Unexpected signup error', err);
    return res.status(500).json({ error: err?.message ?? 'Unexpected server error' });
  }
}
