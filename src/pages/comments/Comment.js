import React, { useState } from "react";
import Media from 'react-bootstrap/Media';
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";
import CommentEditForm from "./CommentEditForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setPost,
    setComments,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  // Handle comment deletion
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {}
  };

  return (
    <div>
      <hr />

      {/* Media component for comment display */}
      <Media className="d-flex align-items-center">
        <Link to={`/profiles/${profile_id}`} className={styles.AvatarHover}>
          <Avatar src={profile_image} height={30} />
        </Link>

        {/* Media body for comment content */}
        <Media.Body className="ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>

          {/* Render comment edit form if in edit mode */}
          {showEditForm ? (
            <CommentEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <>
              {/* Render edit and delete icons for comment owner */}
              {is_owner ? (
                <>
                  <span onClick={handleDelete} className={styles.editDelete}>
                    <i className="fa-solid fa-xmark"></i>
                  </span>
                  <span
                    onClick={() => setShowEditForm(true)}
                    className={styles.editDelete}
                  >
                    <i className="fa-solid fa-ellipsis"></i>
                  </span>
                </>
              ) : null}

              {/* Display the comment content */}
              <p>{content}</p>
            </>
          )}
        </Media.Body>
      </Media>
    </div>
  );
};

export default Comment;