// /api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader(
    'Access-Control-Allow-Origin',
    process.env.NODE_ENV === 'production'
      ? 'https://zyra.fund'
      : 'http://localhost:5173'
  );
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing required fields: email, password' });
  }

  try {
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      return res.status(401).json({ error: signInError.message || 'Invalid credentials' });
    }

    const userId = signInData.user?.id;
    if (!userId) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (profileError) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    return res.status(200).json({
      message: 'Login successful',
      user: profile,
      session: signInData.session, 
    });
  } catch (err: any) {
    console.error('Login error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
