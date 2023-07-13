import { fetchAllProjects } from '@/lib/actions';

import { ProjectInterface } from '@/common';
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

const Home = async () => {
  const data = (await fetchAllProjects()) as ProjectsSearch;

  const projectsToDisplay = data?.projectSearch?.edges || [];

  if (!projectsToDisplay.length) {
    return (
      <section className="flexStart flex-col paddings">
        <h1>Categories</h1>

        <p className="no-result-text text-center">
          There are no projects to display
        </p>
      </section>
    );
  }

  return (
    <section className="flex-start flex-col paddings mb-16">
      <h1>Categories</h1>
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
      <h1>Pagination</h1>
    </section>
  );
};

export default Home;
