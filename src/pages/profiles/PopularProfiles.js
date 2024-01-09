import React from "react";
import Container from 'react-bootstrap/Container';
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import styles from '../../styles/PopularProfiles.module.css'
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";

const PopularProfiles = ({ mobile }) => {
  const { popularProfiles } = useProfileData();

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {popularProfiles.results.length ? (
        // Render popular profiles if there are results
        <>
          <p className={styles.boldText}>User suggestions</p>
          {mobile ? (
            // Render mobile layout with up to 4 profiles side by side
            <div className="d-flex justify-content-around">
              {popularProfiles.results.slice(0, 4).map((profile) => (
                <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            // Render profiles in a regular layout
            popularProfiles.results.map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularProfiles;