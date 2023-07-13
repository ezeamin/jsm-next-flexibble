import Image from 'next/image';
import Link from 'next/link';

import { UserProfile } from '@/common';
import { getUserProject } from '@/lib/actions';

interface RelatedProjectsProps {
  projectId: string;
  userId: string;
}

const RelatedProjects = async (props: RelatedProjectsProps) => {
  const { projectId, userId } = props;

  const result = (await getUserProject(userId)) as { user?: UserProfile };

  if (!result.user) {
    return <p>User Projects not found</p>;
  }

  const filteredProjects = result?.user?.projects?.edges.filter(
    ({ node }) => node.id !== projectId
  );

  return (
    <section className="flex flex-col mt-5 w-full">
      <div className="flexBetween">
        <p className="text-base font-bold">More by {result.user?.name}</p>
        <Link
          href={`/profile/${userId}`}
          className="text-primary-purple text-base"
        >
          View all
        </Link>
      </div>

      <div className="related_projects-grid">
        {filteredProjects?.map(({ node }) => (
          <div
            className="flexCenter related_project-card drop-shadow-card"
            key={node.id}
          >
            <Link
              href={`/project/${node.id}`}
              className="flexCenter group relative w-full h-full"
            >
              <Image
                src={node?.image}
                width={414}
                height={314}
                className="w-full h-full object-cover rounded-2xl"
                alt="project image"
              />
              <div className="hidden group-hover:flex related_project-card_title">
                <p className="w-full">{node.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
export default RelatedProjects;
