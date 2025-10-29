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

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields: name, email, password' });
  }

  try {
    const { data: userData, error: signupError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name },
    });

    if (signupError) throw signupError;
    const userId = userData.user?.id;


    const { data: insertData, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          user_id: userId,
          name,
          email,
          profile_visibility: true,
        },
      ])
      .select('*')
      .single();

    if (insertError) throw insertError;

    return res.status(201).json({
      message: 'User created successfully',
      user: insertData,
    });
  } catch (err: any) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
