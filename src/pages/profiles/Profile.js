import React from "react";
import styles from "../../styles/Profile.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { useSetProfileData } from "../../contexts/ProfileDataContext";


const Profile = (props) => {
  const { profile, mobile, imageSize = 30 } = props;
  const { id, following_id, image, owner } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const  {handleFollow, handleUnfollow} = useSetProfileData();

  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      {/* Display owner's name */}
      <div className={`mx-2 ${styles.WordBreak}`}>
        {owner}
      </div>
      {/* Display follow/unfollow button */}
      <div className={`${!mobile && "ml-auto"}`}>
        {!mobile &&
          currentUser &&
          !is_owner &&
          (following_id ? (
            // Display unfollow button if the user is following the profile
            <span
              className={`${styles.Follow}`}
              onClick={() => handleUnfollow(profile)}
            >
              Unfollow
            </span>
          ) : (
            // Display follow button if the user is not following the profile
            <span
            className={`${styles.Follow}`}
            onClick={() => handleFollow(profile)}
            >
              Follow
            </span>
          ))}
      </div>
    </div>
  );
};

export default Profile;