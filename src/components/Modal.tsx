'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useRef } from 'react';

const Modal = ({ children }: { children: React.ReactNode }) => {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const handleDismiss = useCallback(() => {
    router.push('/');
  }, [router]);

  // click on overlay
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlay.current && handleDismiss) {
        handleDismiss();
      }
    },
    [handleDismiss, overlay]
  );

  return (
    <div ref={overlay} className="modal" onClick={handleClick}>
      <button
        type="button"
        className="absolute top-4 right-8"
        onClick={handleDismiss}
      >
        <Image src="/close.svg" width={17} height={17} alt="close" />
      </button>
      <div ref={wrapper} className="modal_wrapper">
        {children}
      </div>
    </div>
  );
};
export default Modal;
