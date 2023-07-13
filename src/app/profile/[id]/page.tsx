import { UserProfile } from '@/common';
import { getUserProject } from '@/lib/actions';

import ProfilePage from '@/components/ProfilePage';

interface ProfilePageProps {
  params: {
    id: string;
  };
}

const UserProfilePage = async (props: ProfilePageProps) => {
  const {
    params: { id },
  } = props;

  const result = (await getUserProject(id, 100)) as { user?: UserProfile };

  if (!result?.user) {
    return <p className="no-result-text">User Not found</p>;
  }

  return <ProfilePage user={result.user} />;
};
export default UserProfilePage;
