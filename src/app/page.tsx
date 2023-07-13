import { ProjectInterface } from '@/common';
import { fetchAllProjects } from '@/lib/actions';

import Categories from '@/components/Categories';
import Pagination from '@/components/Pagination';
import ProjectCard from '@/components/ProjectCard';

interface ProjectsSearch {
  projectSearch: {
    edges: {
      node: ProjectInterface;
    }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
}

interface SearchParams {
  category?: string;
  endcursor?: string;
}

interface HomeProps {
  searchParams: SearchParams;
}

const Home = async (props: HomeProps) => {
  const {
    searchParams: { category, endcursor },
  } = props;

  const data = (await fetchAllProjects(category, endcursor)) as ProjectsSearch;

  const projectsToDisplay = data?.projectSearch?.edges || [];
  const pagination = data?.projectSearch?.pageInfo || {};

  if (!projectsToDisplay.length) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories />

        <p className="no-result-text text-center">
          There are no projects to display
        </p>
      </section>
    );
  }

  return (
    <section className="flex-start flex-col paddings mb-16">
      <Categories />
      <section className="projects-grid">
        {projectsToDisplay.map(({ node }) => (
          <ProjectCard
            key={node.id}
            id={node.id}
            image={node.image}
            title={node.title}
            name={node.createdBy.name}
            avatarUrl={node.createdBy.avatarUrl}
            userId={node.createdBy.id}
          />
        ))}
      </section>
      <Pagination
        startCursor={pagination.startCursor}
        endCursor={pagination.endCursor}
        hasPreviousPage={pagination.hasPreviousPage}
        hasNextPage={pagination.hasNextPage}
      />
    </section>
  );
};

export default Home;

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;
