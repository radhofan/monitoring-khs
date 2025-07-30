// app/dashboard/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { User } from '@/app/types';

export default function Me() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/me')
      .then((res) => res.json())
      .then((data: User) => {
        setUser(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      {user?.role === 'admin' && <button>Delete Users (Admin Only)</button>}
      {user?.role === 'guest' && <p>Welcome Guest! Limited access.</p>}
      <p>Your role: {user?.role}</p>
    </div>
  );
}
