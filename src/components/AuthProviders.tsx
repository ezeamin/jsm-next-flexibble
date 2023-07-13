'use client';

import { getProviders, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';

import Button from './Button';

interface Provider {
  id: string;
  name: string;
  type: string;
  signInUrl: string;
  callbackUrl: string;
  signInUrlParams: Record<string, string> | null;
}

type Providers = Record<string, Provider>;

const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();

      setProviders(res);
    };

    fetchProviders();
  }, []);

  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider) => (
          <Button
            key={provider.id}
            onClick={() => signIn(provider?.id)}
            title="Sign in"
          />
        ))}
      </div>
    );
  }

  return <div style={{ height: '44px' }} />;
};

export default AuthProviders;
