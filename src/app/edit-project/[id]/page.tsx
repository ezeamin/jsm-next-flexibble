import { redirect } from 'next/navigation';

import { ProjectInterface } from '@/common';
import { getProjectDetails } from '@/lib/actions';
import { getCurrentUser } from '@/lib/session';

import Modal from '@/components/Modal';
import ProjectForm from '@/components/ProjectForm';

interface EditProjectProps {
  params: {
    id: string;
  };
}

const EditProject = async (props: EditProjectProps) => {
  const {
    params: { id: projectId },
  } = props;

  const session = await getCurrentUser();
  const result = (await getProjectDetails(projectId)) as {
    project?: ProjectInterface;
  };

  if (!session?.user || !result?.project) {
    redirect('/');
  }

  return (
    <Modal>
      <h3 className="modal-head-text">Edit Project</h3>

      <ProjectForm type="edit" session={session} project={result.project} />
    </Modal>
  );
};

export default EditProject;
