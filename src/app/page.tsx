import { ProjectInterface } from '@/common';
import { fetchAllProjects } from '@/lib/actions';

import Categories from '@/components/Categories';
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
}

interface HomeProps {
  searchParams: SearchParams;
}

const Home = async (props: HomeProps) => {
  const {
    searchParams: { category },
  } = props;

  const data = (await fetchAllProjects(category)) as ProjectsSearch;

  const projectsToDisplay = data?.projectSearch?.edges || [];

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
      <h1>Pagination</h1>
    </section>
  );
};

export default Home;
