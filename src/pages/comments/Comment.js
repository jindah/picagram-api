import React from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";

const Comment = (props) => {
  const { profile_id, profile_image, owner, updated_at, content } = props;

  return (
    <div>
    <hr />
    <Media className="d-flex align-items-center">
        <Link to={`/profiles/${profile_id}`} className={styles.AvatarHover}>
        <Avatar src={profile_image} height={30} />
        </Link>
        <Media.Body className="ml-2">
        <span className={styles.Owner}>{owner}</span>
        <span className={styles.Date}>{updated_at}</span>
        <p>{content}</p>
        </Media.Body>
    </Media>
    </div>
  );
};

export default Comment;