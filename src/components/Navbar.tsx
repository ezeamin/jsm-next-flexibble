import Image from 'next/image';
import Link from 'next/link';

import { getCurrentUser } from '@/lib/session';

import AuthProviders from './AuthProviders';

import { NavLinks } from '@/constants';

const Navbar = async () => {
  const session = await getCurrentUser();

  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="./logo.svg" width={115} height={43} alt="flexibble" />
        </Link>
        <div className="xl:flex hidden text-small gap-7">
          {NavLinks.map((link, index) => (
            <li key={index} className="list-none">
              <Link href={link.href}>{link.text}</Link>
            </li>
          ))}
        </div>
      </div>
      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            {session?.user?.image && (
              <Image
                src={session.user.image}
                alt={session.user.name}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <Link href="/create-project">Share Work</Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};
export default Navbar;
