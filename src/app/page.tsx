'use client';
import { useSession } from 'next-auth/react';
import * as React from 'react';

export default function Home() {
  const { data: session } = useSession();
  return (
    <div>
      <h3>Name: {session?.user.name}</h3>
      <h3>Email: {session?.user.email}</h3>
      <h3>Is admin? {session?.user.isAdmin ? 'true' : 'false'}</h3>
      <h3>Image URL: {session?.user.image}</h3>
    </div>
  );
}
