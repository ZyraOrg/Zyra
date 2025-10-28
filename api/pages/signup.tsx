import React, { useState } from 'react';

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wallet, setWallet] = useState('');
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          wallet_address: wallet || null,
          profile_visibility: visible,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        setResult(`Error: ${json.error || 'Unknown error'}`);
      } else {
        setResult(`Success — user created with id: ${(json.user && json.user.user_id) || 'unknown'}`);
        setName('');
        setEmail('');
        setPassword('');
        setWallet('');
        setVisible(true);
      }
    } catch (err: any) {
      setResult(`Network error: ${err?.message ?? String(err)}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ fontFamily: 'system-ui', padding: 24 }}>
      <h1>Signup</h1>
      <form onSubmit={onSubmit} style={{ maxWidth: 480 }}>
        <div style={{ marginBottom: 8 }}>
          <label>Name</label>
          <br />
          <input value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Email</label>
          <br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Password</label>
          <br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Wallet address (optional)</label>
          <br />
          <input value={wallet} onChange={(e) => setWallet(e.target.value)} style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>
            <input type="checkbox" checked={visible} onChange={(e) => setVisible(e.target.checked)} />{' '}
            Profile visible
          </label>
        </div>

        <button type="submit" disabled={loading} style={{ padding: '8px 16px' }}>{loading ? 'Creating...' : 'Create account'}</button>
      </form>

      {result && (
        <div style={{ marginTop: 16, padding: 12, border: '1px solid #ddd', borderRadius: 6 }}>
          {result}
        </div>
      )}
    </div>
  );
};

export default SignupPage;
