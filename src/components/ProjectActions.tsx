'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { deleteProject, fetchToken } from '@/lib/actions';

interface ProjectActionsProps {
  projectId: string;
}

const ProjectActions = (props: ProjectActionsProps) => {
  const { projectId } = props;

  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);

    const { token } = await fetchToken();

    try {
      await deleteProject(projectId, token);

      router.push('/');
    } catch (error) {
      alert('Something went wrong, please try again');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Link
        href={`/edit-project/${projectId}`}
        className="flexCenter edit-action-btn"
      >
        <Image src="/pencile.svg" width={15} height={15} alt="edit" />
      </Link>

      <button
        className={`flexCenter delete-action_btn ${
          isDeleting ? 'bg-gray' : 'bg-primary-purple'
        }`}
        type="button"
        onClick={handleDelete}
      >
        <Image src="/trash.svg" width={15} height={15} alt="edit" />
      </button>
    </>
  );
};

export default ProjectActions;
