'use client';

import { useRouter } from 'next/navigation';

import Button from './Button';

interface PaginationProps {
  startCursor: string;
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

const Pagination = (props: PaginationProps) => {
  const { startCursor, endCursor, hasPreviousPage, hasNextPage } = props;

  const router = useRouter();

  const handleNavigation = (direction: string) => {
    const currentParams = new URLSearchParams(window.location.search);

    if (direction === 'next' && hasNextPage) {
      currentParams.delete('startcursor');
      currentParams.set('endcursor', endCursor);
    } else if (direction === 'first' && hasPreviousPage) {
      currentParams.delete('endcursor');
      currentParams.set('startcursor', startCursor);
    }

    const newParams = currentParams.toString();
    const newPathname = `${window.location.pathname}?${newParams}`;

    router.push(newPathname);
  };

  return (
    <div className="w-full flexCenter gap-5 mt-10">
      {hasPreviousPage && (
        <Button
          title="First page"
          type="button"
          onClick={() => handleNavigation('first')}
        >
          First page
        </Button>
      )}
      {hasNextPage && (
        <Button
          title="Next"
          type="button"
          onClick={() => handleNavigation('next')}
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default Pagination;
