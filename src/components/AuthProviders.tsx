'use client';

import { getProviders, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';

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

      console.log(res);

      setProviders(res);
    };

    fetchProviders();
  }, []);

  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider) => (
          <button key={provider.id} onClick={() => signIn(provider?.id)}>
            {provider.id}
          </button>
        ))}
      </div>
    );
  }

  return <div>AuthProviders</div>;
};

export default AuthProviders;
