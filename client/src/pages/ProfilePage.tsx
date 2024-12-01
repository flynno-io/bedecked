// src/pages/ProfilePage.tsx

import '../../styles/profile.scss';

import BottomContainer from '../components/Profile/BottomContainer';
import TopContainer from '../components/Profile/TopContainer';

const ProfilePage = () => {
  return (
    <section className="profile">
      <TopContainer/>
      <BottomContainer/>
    </section>
  )
}

export default ProfilePage